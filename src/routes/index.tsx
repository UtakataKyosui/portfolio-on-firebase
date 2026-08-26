import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import projects from '@/data/github-projects.json';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Portfolio | ホーム' },
      {
        name: 'description',
        content:
          'フロントエンド設計とプロダクト開発を軸に、技術記事と制作実績を発信しています。',
      },
    ],
  }),
  component: HomePage,
});

const LATEST_POSTS = [
  {
    slug: 'scaling-microservices-architecture',
    date: '2026-08-01',
    title: 'Scaling Microservices Architecture',
    description:
      '大規模なマイクロサービス基盤を設計・運用する際に踏んだ意思決定と学びをまとめる。',
    tags: ['Architecture', 'System Design'],
  },
  {
    slug: 'react-19-concurrent-features',
    date: '2026-07-18',
    title: 'React 19 の並行機能を実務で使う',
    description:
      'Suspense や Transition を実際のプロダクトに導入した際の勘所を紹介する。',
    tags: ['React'],
  },
  {
    slug: 'design-systems-that-scale',
    date: '2026-06-30',
    title: '拡張性のあるデザインシステムの作り方',
    description: 'トークン設計からコンポーネント運用までの実践的な指針。',
    tags: ['Design'],
  },
] as const;

const FEATURED_PROJECTS = projects.slice(0, 3);

function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6">
      <section className="flex flex-col items-center gap-6 py-12 text-center">
        <h1 className="font-heading font-semibold text-4xl sm:text-5xl">
          I build digital experiences that blend form and function
        </h1>
        <p className="max-w-2xl text-foreground/70">
          フロントエンド設計とプロダクト開発を軸に、技術記事と制作実績を発信しています。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            nativeButton={false}
            render={<Link to="/projects">プロジェクトを見る</Link>}
          />
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link to="/blog">ブログ記事を読む</Link>}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-2xl">最新の記事</h2>
          <Link to="/blog" className="text-primary text-sm hover:underline">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {LATEST_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col gap-2 rounded-lg bg-card p-5"
            >
              <time className="text-foreground/60 text-xs">{post.date}</time>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-foreground/70 text-sm">{post.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map((tag) => (
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
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-2xl">制作実績</h2>
          <Link to="/projects" className="text-primary text-sm hover:underline">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
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
              <p className="text-foreground/70 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.language && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                    {project.language}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
