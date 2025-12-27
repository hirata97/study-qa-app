# Study Q&A App

Q&A学習アプリ - Next.js + PostgreSQL + Material-UI

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router) + TypeScript
- **UI**: Material-UI (MUI) v5
- **データベース**: PostgreSQL 16
- **ORM**: Prisma
- **コンテナ**: Docker Compose

## 機能

- 質問と回答の作成・表示
- カテゴリ別の分類
- RESTful API
- レスポンシブデザイン

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/hirata97/study-qa-app.git
cd study-qa-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

`.env` ファイルの内容は以下の通り（デフォルトで動作します）：

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/study_qa_app?schema=public"
```

### 4. PostgreSQLの起動（Docker Compose）

```bash
docker-compose up -d
```

### 5. データベースのマイグレーション

```bash
npm run db:push
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 使い方

### 質問の追加

1. 「質問を追加」ボタンをクリック
2. カテゴリ、質問、回答を入力
3. 「追加」ボタンでデータベースに保存

### データベースの確認

Prisma Studio を使用してデータベースの内容を確認できます：

```bash
npm run db:studio
```

## API エンドポイント

### 質問一覧の取得

```bash
GET /api/questions
```

### 質問の作成

```bash
POST /api/questions
Content-Type: application/json

{
  "question": "質問内容",
  "answer": "回答内容",
  "category": "カテゴリ名（任意）"
}
```

### 特定の質問の取得

```bash
GET /api/questions/:id
```

### 質問の更新

```bash
PUT /api/questions/:id
Content-Type: application/json

{
  "question": "更新後の質問",
  "answer": "更新後の回答"
}
```

### 質問の削除

```bash
DELETE /api/questions/:id
```

## プロジェクト構造

```
study-qa-app/
├── prisma/
│   └── schema.prisma       # データベーススキーマ
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── questions/  # API Routes
│   │   ├── layout.tsx      # レイアウト
│   │   └── page.tsx        # ホームページ
│   └── theme.ts            # Material-UI テーマ
├── docker-compose.yml      # PostgreSQL設定
├── package.json
└── tsconfig.json
```

## コマンド一覧

```bash
npm run dev           # 開発サーバー起動
npm run build         # 本番ビルド
npm run start         # 本番サーバー起動
npm run lint          # ESLint実行
npm run db:generate   # Prisma Clientの生成
npm run db:push       # データベーススキーマの反映
npm run db:studio     # Prisma Studioの起動
```

## Docker Composeコマンド

```bash
docker-compose up -d      # PostgreSQL起動
docker-compose down       # PostgreSQL停止
docker-compose logs -f    # ログ確認
```

## ライセンス

MIT

## 作者

Hirata Mizuki
