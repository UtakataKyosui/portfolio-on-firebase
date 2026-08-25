# portfolio-on-firebase

このリポジトリは、技術記事と制作実績をFirestore上のコンテンツとして管理しながら、同一ドメインで公開ページと管理画面を提供するポートフォリオサイトである。公開ページはビルド時にプリレンダリングしてSEOに対応し、Firebase Hostingから静的配信する。

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| ビルド・ルーティング | Rsbuild、TanStack Start、TanStack Router |
| UI | React 19 |
| スタイリング | Tailwind CSS |
| ホスティング | Firebase Hosting |
| コンテンツ・認証 | Firebase Firestore、Firebase Auth |
| lint・format | Biome、rslint |
| テスト | rstest |

## コンテンツ構成

技術記事と制作実績はFirestoreで管理し、管理画面から作成・編集・削除する。トップページの自己紹介セクションはリポジトリ内の静的コンテンツとして持ち、Firestoreは使わない。URL構造とナビゲーションの詳細は`docs/information-architecture.md`にまとめてある。

## 管理画面

管理画面は`/admin`配下に置き、Firebase Authでログインした管理者だけが技術記事と制作実績をFirestoreに対して操作できる。公開ページから`/admin`配下へのリンクは張らないため、ビルド時のプリレンダリングが管理画面を巡回することはない。

## デプロイ

Firebase Hostingへのデプロイは以下のコマンドで行う。事前に`firebase login`でログインしておく。

```bash
pnpm build
firebase deploy --only hosting
```

## セットアップ

依存パッケージをインストールする。

```bash
pnpm install
```

開発サーバーを起動する。`http://localhost:3000`でアプリを確認できる。

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

`.env`にはFirebase Web SDKの設定値が入っている。この値は公開前提のものであり、アクセス制御はFirestore Security Rulesと認証済みドメインの制限で行う。

## 関連ドキュメント

- `docs/information-architecture.md` にURL構造とナビゲーション構成をまとめてある
- `DESIGN.md` にデザイン方向性をまとめてある
