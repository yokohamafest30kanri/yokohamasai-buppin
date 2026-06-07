"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
          padding: "12px 16px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          backgroundColor: "#e3f2fd",
          flexWrap: "wrap", // ← スマホ対応
          gap: "8px",
        }}
      >
        {/* 左：タイトル */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            flex: "1 1 auto",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            30th横浜祭 借用物品登録サイト
          </h2>
        </Link>

        {/* 右側ボタン群 */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap", // ← 折り返し
            justifyContent: "flex-end",
          }}
        >
          {!isItemsTopPage && (
            <>
              <Link href="/items/internal">
                <button
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#FFF9C4",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  学内借用物品一覧へ
                </button>
              </Link>

              <Link href="/items/external">
                <button
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#F3E5F5",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  学外借用物品一覧へ
                </button>
              </Link>
            </>
          )}

          <Link href="/cart">
            <button
              style={{
                padding: "8px 14px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              カート
            </button>
          </Link>
        </div>
      </header>

      {children}
    </>
  );
}