# portfolio-on-firebase

このリポジトリは、技術記事と制作実績を紹介するポートフォリオサイトである。公開ページはCloudflare Workers上でリクエストごとにSSRする。管理画面によるコンテンツ管理は未実装であり、別Issueで構築する予定である。

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| ビルド・ルーティング | Vite、TanStack Start、TanStack Router |
| UI | React 19 |
| スタイリング | Tailwind CSS |
| ホスティング | Cloudflare Workers |
| lint・format | Biome、rslint |
| テスト | Vitest |

## コンテンツ構成

制作実績はGitHubリポジトリから`scripts/sync-github-projects.mjs`で同期したデータを表示する。技術記事は現時点では静的なサンプルデータであり、CMSによる管理は未実装である。トップページの自己紹介セクションはリポジトリ内の静的コンテンツとして持つ。URL構造とナビゲーションの詳細は`docs/information-architecture.md`にまとめてある。

## デプロイ

main への push で `.github/workflows/cloudflare-deploy.yml` が Cloudflare Workers へ自動デプロイする。PR では `.github/workflows/cloudflare-preview.yml` がプレビュー環境を作成しURLをコメントする。シークレットの設定手順は`docs/cloudflare-deploy-setup.md`を参照する。

## セットアップ

依存パッケージをインストールする。

```bash
pnpm install
```

開発サーバーを起動する。`http://localhost:5173`でアプリを確認できる。

```bash
pnpm dev
```

本番用にビルドする。

```bash
pnpm build
```

ビルド結果をローカルでプレビューする。

```bash
pnpm preview
```

## 関連ドキュメント

- `docs/information-architecture.md` にURL構造とナビゲーション構成をまとめてある
- `DESIGN.md` にデザイン方向性をまとめてある
