import Link from "next/link";
import Image from "next/image";
import { internalItems } from "../../../lib/items";

export default function InternalItemListPage() {
  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
        学内借用物品一覧表
      </h1>

      <div style={{ marginTop: "20px" }}>
        {internalItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              gap: "16px",
            }}
          >
            {/* ===== 画像 ===== */}
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
                    width: "100%",
                    height: "100%",
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

              {/* ✅ ここが重要（variation対応） */}
              <ul style={{ marginTop: "12px", fontSize: "14px" }}>
                {/* 上限 */}
                <li>
                  上限個数：
                  {item.variations
                    ? `${Math.max(
                        ...item.variations.map((v) => v.maxQty)
                      )} 個`
                    : `${item.maxQty} 個`}
                </li>

                {/* 値段 */}
                <li>
                  値段：
                  {item.variations
                    ? item.variations.every((v) => v.price === 0)
                      ? " 無料"
                      : ` ${Math.min(
                          ...item.variations.map((v) => v.price)
                        )}円〜`
                    : item.price === 0
                    ? " 無料"
                    : ` ${item.price}円 / 個`}
                </li>
              </ul>

              {/* ✅ variation表示 */}
              {item.variations && (
                <p style={{ marginTop: "6px", fontSize: "12px", color: "#555" }}>
                  ※サイズ選択あり
                </p>
              )}

              {/* ボタン */}
              <Link href={`/items/${item.id}`}>
                <button
                  style={{
                    marginTop: "12px",
                    width: "100%",
                    maxWidth: "220px",
                    padding: "10px",
                    backgroundColor: "#FFF9C4",
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