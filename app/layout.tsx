export const dynamic = "force-dynamic";

import { CartProvider } from ".././context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ✅ ここで包む */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}