"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isItemsTopPage = pathname === "/";

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
        {/* ✅ 左：タイトル（トップページへのリンク） */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
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

        {/* 右側（既存のまま） */}
        <div style={{ display: "flex", gap: "10px" }}>
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
                    fontSize: "13px",
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
                    fontSize: "13px",
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