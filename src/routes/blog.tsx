import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/blog')({
  component: BlogListPage,
});

const CATEGORIES = [
  'React',
  'Design',
  'Architecture',
  'System Design',
  'DevOps',
] as const;

const POSTS = [
  {
    slug: 'scaling-microservices-architecture',
    date: '2026-08-01',
    title: 'Scaling Microservices Architecture',
    description:
      '大規模なマイクロサービス基盤を設計・運用する際に踏んだ意思決定と学びをまとめる。',
    category: 'Architecture',
  },
  {
    slug: 'react-19-concurrent-features',
    date: '2026-07-18',
    title: 'React 19 の並行機能を実務で使う',
    description:
      'Suspense や Transition を実際のプロダクトに導入した際の勘所を紹介する。',
    category: 'React',
  },
  {
    slug: 'design-systems-that-scale',
    date: '2026-06-30',
    title: '拡張性のあるデザインシステムの作り方',
    description: 'トークン設計からコンポーネント運用までの実践的な指針。',
    category: 'Design',
  },
  {
    slug: 'event-driven-system-design',
    date: '2026-06-10',
    title: 'イベント駆動アーキテクチャの設計指針',
    description: '疎結合なシステムを構築するためのイベント設計パターン。',
    category: 'System Design',
  },
  {
    slug: 'ci-cd-pipeline-best-practices',
    date: '2026-05-22',
    title: 'CI/CD パイプラインのベストプラクティス',
    description: 'デプロイの信頼性を高めるパイプライン構築の勘所。',
    category: 'DevOps',
  },
  {
    slug: 'hooks-composition-patterns',
    date: '2026-05-02',
    title: 'カスタム Hooks の合成パターン',
    description: '再利用可能な Hooks を設計するための実践的なパターン集。',
    category: 'React',
  },
] as const;

function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () =>
      activeCategory
        ? POSTS.filter((post) => post.category === activeCategory)
        : POSTS,
    [activeCategory],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-heading font-semibold text-4xl">
          Writings & Thoughts
        </h1>
        <p className="text-foreground/70">
          技術記事・設計に関する考察を発信しています。
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            'rounded-full px-3 py-1 text-sm transition-colors',
            activeCategory === null
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/70',
          )}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              'rounded-full px-3 py-1 text-sm transition-colors',
              activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col gap-2 rounded-lg bg-card p-5"
          >
            <span className="text-primary text-xs">{post.category}</span>
            <time className="text-foreground/60 text-xs">{post.date}</time>
            <h2 className="font-medium">{post.title}</h2>
            <p className="text-foreground/70 text-sm">{post.description}</p>
            <span className="pt-1 text-primary text-sm hover:underline">
              Read Article
            </span>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          type="button"
          aria-label="前のページ"
          disabled
          className="rounded-md p-2 text-foreground/40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-foreground/70 text-sm">Page 1 of 4</span>
        <button
          type="button"
          aria-label="次のページ"
          className="rounded-md p-2 text-foreground/70 hover:bg-muted"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
