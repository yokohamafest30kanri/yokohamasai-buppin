import Link from "next/link";

export default function ItemsTopPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        物品一覧
      </h1>

      <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "20px" }}>
          <Link href="/items/internal">
            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#e3f2fd",
                border: "1px solid #333",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              学内借用物品
            </button>
          </Link>
        </li>

        <li>
          <Link href="/items/external">
            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#e3f2fd",
                border: "1px solid #333",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              学外借用物品
            </button>
          </Link>
        </li>
      </ul>
    </main>
  );
}