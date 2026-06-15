export const dynamic = "force-dynamic";

// ✅ スマホ対応 & 検索対策（超重要）
export const metadata = {
  title: {
      default: "横浜祭 借用物品登録サイト",
      template: "%s | 横浜祭 借用物品登録サイト",
    },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: false,
    follow: false,
  },
};

import { CartProvider } from ".././context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,               // ✅ 余白バグ防止
          fontFamily: "sans-serif" // ✅ 読みやすさUP
        }}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}