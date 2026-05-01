
import Link from "next/link";
import Image from "next/image";
import { items } from "../../lib/items";

export default function ItemListPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>物品一覧表</h1>

      <div style={{ marginTop: "30px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              gap: "20px",
            }}
          >
            {/* 左：写真エリア */}
            <div style={{ width: "180px", flexShrink: 0 }}>
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  border: "1px solid #999",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8f8f8",
                }}
              >
                <span>写真</span>
              </div>

              <Link href={`/items/${item.id}`}>
                <button
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "#cde0ef",
                    border: "1px solid #333",
                    cursor: "pointer",
                  }}
                >
                  詳細を見る
                </button>
              </Link>
            </div>

            {/* 右：説明エリア */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {item.name}
              </h2>

              <p style={{ marginTop: "10px" }}>{item.description}</p>

              <ul style={{ marginTop: "20px" }}>
                <li>上限個数：{item.maxQty} 個</li>
                <li>
                  値段：{item.price === 0 ? "無料" : `${item.price}円 / 個`}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
