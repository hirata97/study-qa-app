import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Study Q&A App",
  description: "Q&A学習アプリ - Next.js + PostgreSQL + Material-UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
