"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ itemsトップページかどうか
  const isItemsTopPage = pathname === "/items";

  return (
    <>
      {/* ===== items用ヘッダー ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          backgroundColor: "#e3f2fd",
        }}
      >
        {/* 左：タイトル */}
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
          30th横浜祭 借用物品登録サイト
        </h2>

        {/* 右：学内 / 学外 / カート */}
        <div style={{ display: "flex", gap: "10px" }}>
          {/* ✅ itemsトップページ以外でのみ表示 */}
          {!isItemsTopPage && (
            <>
              {/* 学内 */}
              <Link href="/items/internal">
                <button
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#FFF9C4", // 🟡 学内：薄い黄色
                    color: "#333",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  学内借用物品はこちら
                </button>
              </Link>

              {/* 学外 */}
              <Link href="/items/external">
                <button
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#F3E5F5", // 🟣 学外：薄い紫
                    color: "#333",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  学外借用物品はこちら
                </button>
              </Link>
            </>
          )}

          {/* カート（常に表示） */}
          <Link href="/cart">
            <button
              style={{
                padding: "8px 14px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              カート
            </button>
          </Link>
        </div>
      </header>

      {/* ===== ページ本体 ===== */}
      {children}
    </>
  );
}