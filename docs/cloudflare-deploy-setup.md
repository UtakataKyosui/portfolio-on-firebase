# Cloudflare Workers デプロイ用シークレットの設定

`cloudflare-deploy.yml`（main への push で本番デプロイ）と `cloudflare-preview.yml`（PR でプレビューデプロイ）は、リポジトリの GitHub Secrets に登録した `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を使う。

## CLOUDFLARE_API_TOKEN の発行

1. Cloudflare ダッシュボードの [API トークン管理画面](https://dash.cloudflare.com/profile/api-tokens) を開く
2. 「トークンを作成する」を選び、テンプレート「Edit Cloudflare Workers」を選択する。このテンプレートには Workers Scripts の編集権限が含まれる
3. 対象アカウントを本プロジェクトのアカウントに絞り、トークンを発行する
4. 発行されたトークンをコピーする。この画面を離れると再表示できない

## CLOUDFLARE_ACCOUNT_ID の取得

Cloudflare ダッシュボードでアカウントを開き、右側のサイドバーに表示される「アカウント ID」をコピーする。

## GitHub Secrets への登録

`gh` CLI でリポジトリに登録する。

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo UtakataKyosui/portfolio-on-firebase
gh secret set CLOUDFLARE_ACCOUNT_ID --repo UtakataKyosui/portfolio-on-firebase
```

各コマンドを実行すると値の入力を求められるので、上記でコピーした値を貼り付ける。

登録できているかは以下で確認する。

```bash
gh secret list --repo UtakataKyosui/portfolio-on-firebase
```

`CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` の2件が表示されれば設定完了である。
