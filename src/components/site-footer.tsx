import { ExternalLink } from 'lucide-react';

// lucide-react にはブランドロゴアイコンが含まれないため、汎用アイコン + テキストラベルで代替する。
const SOCIAL_LINKS = [
  { href: 'https://github.com/', label: 'GitHub' },
  { href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { href: 'https://twitter.com/', label: 'Twitter' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-foreground/60 text-sm">
          &copy; {year} Portfolio. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-foreground/60 text-sm transition-colors hover:text-foreground"
            >
              {label}
              <ExternalLink className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
