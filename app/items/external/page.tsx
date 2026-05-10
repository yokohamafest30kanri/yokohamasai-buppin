import Link from "next/link";
import Image from "next/image";
import { externalItems } from "../../../lib/items";

export default function ExternalItemListPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        学外借用物品一覧表
      </h1>

      <div style={{ marginTop: "30px" }}>
        {externalItems.map((item) => (
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
            {/* ===== 左：写真エリア ===== */}
            <div style={{ width: "180px", flexShrink: 0 }}>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={180}
                  height={180}
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    border: "1px solid #999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f8f8",
                    color: "#666",
                    borderRadius: "4px",
                  }}
                >
                  写真
                </div>
              )}
            </div>

            {/* ===== 右：説明エリア ===== */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {item.name}
              </h2>

              <p style={{ marginTop: "10px" }}>
                {item.description}
              </p>

              <ul style={{ marginTop: "16px" }}>
                <li>上限個数：{item.maxQty} 個</li>
                <li>
                  値段：
                  {item.price === 0
                    ? " 無料"
                    : ` ${item.price}円 / 個`}
                </li>
              </ul>

              {/* ✅ 詳細ページへの導線 */}
              <Link href={`/items/${item.id}`}>
                <button
                  style={{
                    marginTop: "16px",
                    padding: "8px 14px",
                    minWidth: "160px",
                    backgroundColor: "#cde0ef",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  詳細を見る
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}