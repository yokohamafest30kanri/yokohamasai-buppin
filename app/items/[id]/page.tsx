import { internalItems, externalItems } from "../../../lib/items";
import Image from "next/image";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;

  const allItems = [...internalItems, ...externalItems];
  const item = allItems.find((i) => i.id === decodeURIComponent(id));

  if (!item) {
    return (
      <main style={{ padding: "40px" }}>
        <h2>物品が見つかりません。</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        物品詳細
      </h1>

      {/* ===== 上段 ===== */}
      <div style={{ display: "flex", gap: "32px" }}>
        {/* 左：画像 */}
        <div
          style={{
            width: "360px",
            height: "360px",
            border: "1px solid #999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f8f8",
            flexShrink: 0,
          }}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={360}
              height={360}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "#666" }}>写真</span>
          )}
        </div>

        {/* 右：情報 */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
            {item.name}
          </h2>

          <p style={{ marginTop: "12px", lineHeight: 1.6 }}>
            {item.description}
          </p>

          <div style={{ marginTop: "20px" }}>
            <p>上限個数：{item.maxQty} 個</p>
            <p>
              価格：
              {item.price === 0 ? " 無料" : ` ${item.price}円`}
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontWeight: "bold" }}>サイズ</h3>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "6px" }}>
              {item.size}
            </pre>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontWeight: "bold" }}>備考</h3>
            <p style={{ marginTop: "6px" }}>{item.note}</p>
          </div>
        </div>
      </div>

      {/* ===== 下段：数量 & カート ===== */}
      <div
        style={{
          marginTop: "32px",
          padding: "20px",
          border: "1px solid #ccc",
          backgroundColor: "#eef6fa",
        }}
      >
        <ItemDetailClient item={item} />
      </div>
    </main>
  );
}
