import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import rawBoards from '@/data/github-project-boards.json';
import projects from '@/data/github-projects.json';
import { cn } from '@/lib/utils';

type ProjectBoard = {
  number: number;
  title: string;
  description: string | null;
  url: string;
  closed: boolean;
  updatedAt: string;
};

const boards = rawBoards as ProjectBoard[];

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [
      { title: 'Portfolio | プロジェクト' },
      {
        name: 'description',
        content: '制作した実績を技術スタックとともに紹介しています。',
      },
    ],
  }),
  component: FeaturedProjectsPage,
});

const OWNER = 'UtakataKyosui';

const FILTERS = ['すべて', '個人', 'チーム開発'] as const;

type Filter = (typeof FILTERS)[number];

function matchesFilter(project: (typeof projects)[number], filter: Filter) {
  if (filter === 'すべて') return true;
  const isPersonal = project.owner === OWNER;
  return filter === '個人' ? isPersonal : !isPersonal;
}

function FeaturedProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('すべて');

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-heading font-semibold text-4xl">
          Featured Projects
        </h1>
        <p className="text-foreground/70">
          制作した実績を技術スタックとともに紹介しています。
        </p>
      </div>

      {boards.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-heading font-semibold text-2xl">
            進行中のボード
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {boards.map((board) => (
              <a
                key={board.number}
                href={board.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-2 rounded-lg bg-card p-5 hover:bg-card/80"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{board.title}</h3>
                  {board.closed && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                      完了
                    </span>
                  )}
                </div>
                {board.description && (
                  <p className="text-foreground/70 text-sm">
                    {board.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'rounded-full px-3 py-1 text-sm transition-colors',
              activeFilter === filter
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70',
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-2 rounded-lg bg-card p-5"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:underline"
            >
              {project.name}
            </a>
            <p className="text-foreground/70 text-sm">{project.description}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {project.language && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                  {project.language}
                </span>
              )}
              {project.owner !== OWNER && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                  {project.owner}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
