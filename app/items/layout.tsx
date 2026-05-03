import Link from "next/link";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
          30th横浜祭 借用物品登録サイト
        </h2>

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
            🛒 カート
          </button>
        </Link>
      </header>

      {/* ===== ページ本体 ===== */}
      {children}
    </>
  );
}