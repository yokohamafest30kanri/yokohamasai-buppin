import Link from "next/link";
import Image from "next/image";
import { externalItems } from "../../../lib/items";

export default function ExternalItemListPage() {
  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
        学外借用物品一覧表
      </h1>

      <div style={{ marginTop: "20px" }}>
        {externalItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexWrap: "wrap", // ✅ スマホ対応
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              gap: "16px",
            }}
          >
            {/* ===== 写真 ===== */}
            <div
              style={{
                width: "100%",
                maxWidth: "180px",
                aspectRatio: "1 / 1",
              }}
            >
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
                    width: "100%",
                    height: "100%",
                    border: "1px solid #999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f8f8",
                    color: "#666",
                  }}
                >
                  写真
                </div>
              )}
            </div>

            {/* ===== 説明 ===== */}
            <div style={{ flex: 1, minWidth: "220px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.name}
              </h2>

              <p style={{ marginTop: "8px", fontSize: "14px" }}>
                {item.description}
              </p>

              <ul style={{ marginTop: "12px", fontSize: "14px" }}>
                <li>上限個数：{item.maxQty} 個</li>
                <li>
                  値段：
                  {item.price === 0
                    ? " 無料"
                    : ` ${item.price}円 / 個`}
                </li>
              </ul>

              {/* ✅ ボタン */}
              <Link href={`/items/${item.id}`}>
                <button
                  style={{
                    marginTop: "12px",
                    width: "100%", // ✅ スマホで押しやすい
                    maxWidth: "220px",
                    padding: "10px",
                    backgroundColor: "#F3E5F5",
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