# セットアップ手順（クイックスタート）

## 最速でアプリを起動する

### 1. 依存関係のインストール

```bash
cd /home/mizuki/projects/study-qa-app
npm install
```

### 2. PostgreSQL + Pythonバックエンド起動

```bash
docker-compose up -d
```

### 3. 環境変数設定

```bash
cp .env.example .env
```

### 4. データベースセットアップ

```bash
npm run db:push
```

### 5. 開発サーバー起動

```bash
npm run dev:python
```

→ http://localhost:3000 にアクセス

Python API のドキュメントは http://localhost:8000/docs で確認できます。

## 初期データの投入（任意）

Prisma Studioを使って手動でデータを追加：

```bash
npm run db:studio
```

または、アプリのUIから「質問を追加」ボタンで追加。

## トラブルシューティング

### ポート5432が使用中の場合

PostgreSQLが既に起動している可能性があります：

```bash
# 既存のPostgreSQLを停止
sudo systemctl stop postgresql

# または、docker-compose.ymlのポートを変更
# ports: "5433:5432"
# .envのDATABASE_URLも変更
```

### Prismaエラーが出る場合

```bash
# Prisma Clientを再生成
npm run db:generate
npm run db:push
```

## 完全なクリーンアップ

```bash
# Docker停止・削除
docker-compose down -v

# node_modules削除
rm -rf node_modules

# 再インストール
npm install
npm run db:push
```
