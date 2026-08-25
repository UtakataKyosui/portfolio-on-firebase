import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/projects')({
  component: FeaturedProjectsPage,
});

const FILTERS = ['All', 'Web', 'Platform', 'Mobile', 'Open Source'] as const;

const PROJECTS = [
  {
    slug: 'nexus-analytics-platform',
    name: 'Nexus Analytics Platform',
    summary: 'リアルタイム分析ダッシュボード',
    tags: ['Vue.js', 'D3.js', 'Node.js'],
    category: 'Platform',
  },
  {
    slug: 'aura-commerce',
    name: 'Aura Commerce',
    summary: 'ヘッドレスコマースソリューション',
    tags: ['Next.js', 'GraphQL', 'Tailwind CSS'],
    category: 'Web',
  },
  {
    slug: 'synapse-mesh',
    name: 'Synapse Mesh',
    summary: 'ピア・ツー・ピアネットワークライブラリ',
    tags: ['Rust', 'WebAssembly', 'React'],
    category: 'Open Source',
  },
  {
    slug: 'focusflow',
    name: 'FocusFlow',
    summary: '生産性向上のためのタスク管理ツール',
    tags: ['SvelteKit', 'TypeScript', 'PostgreSQL'],
    category: 'Mobile',
  },
] as const;

function FeaturedProjectsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>('All');

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === activeFilter),
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

      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
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
            key={project.slug}
            className="flex flex-col gap-2 rounded-lg bg-card p-5"
          >
            <h2 className="font-medium">{project.name}</h2>
            <p className="text-foreground/70 text-sm">{project.summary}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
