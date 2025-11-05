# Atode フロントエンド

Atodeはシンプルなタスク管理アプリケーションのフロントエンドです。Next.jsを使用して構築されています。

## 環境構築

### 前提条件

- Node.js (v18.0.0 以上)
- npm (v9.0.0 以上) または yarn

### セットアップ手順

1. リポジトリをクローンします。
   ```bash
   git clone <repository-url>
   cd atode-app/frontend
   ```

2. 依存関係をインストールします。
   ```bash
   npm install
   # または
   yarn install
   ```

3. 環境変数を設定します。
   ```bash
   cp .env.local.example .env.local
   ```

4. 必要に応じて、`.env.local` ファイルを編集して環境変数を設定します。
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001

   # Application Settings
   NEXT_PUBLIC_APP_NAME=Atode
   NEXT_PUBLIC_APP_DESCRIPTION=シンプルなタスク管理アプリ
   ```

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
# または
yarn dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で利用可能です。

## ビルドと本番用起動

本番用にビルドして起動するには、以下のコマンドを実行します。

```bash
# ビルド
npm run build
# または
yarn build

# 本番サーバー起動
npm run start
# または
yarn start
```

## コードのリント

コードのリントを実行するには、以下のコマンドを実行します。

```bash
npm run lint
# または
yarn lint
```

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [React](https://reactjs.org/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 静的型チェック
- [date-fns](https://date-fns.org/) - 日付操作ライブラリ
- [Axios](https://axios-http.com/) - HTTPクライアント

## ディレクトリ構成

```
src/
  ├── components/    # 再利用可能なUIコンポーネント
  ├── pages/         # ページコンポーネント
  ├── styles/        # スタイルシート
  ├── types/         # TypeScript型定義
  └── utils/         # ユーティリティ関数
```

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE)の下で公開されています。
