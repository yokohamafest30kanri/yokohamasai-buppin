import { items } from "../../../lib/items";
import Link from "next/link";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;

  const item = items.find((i) => i.id === id);

  if (!item) {
    return <p>物品が見つかりません。</p>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>物品詳細</h1>

      {/* ✅ flex コンテナ */}
      <div style={{ display: "flex", gap: "30px" }}>
        {/* ===== 左カラム ===== */}
        <div style={{ width: "260px", flexShrink: 0 }}>
          <div
            style={{
              width: "260px",
              height: "260px",
              border: "1px solid #999",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            写真
          </div>

          <ItemDetailClient item={item} />

          <Link href="/items">
            <button
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "8px",
                backgroundColor: "#eee",
                border: "1px solid #333",
                cursor: "pointer",
              }}
            >
              物品一覧に戻る
            </button>
          </Link>
        </div>

        {/* ===== 右カラム ===== */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {item.name}
          </h2>

          <p style={{ marginBottom: "16px" }}>
            {item.description}
          </p>

          <div style={{ marginBottom: "24px" }}>
            <p>上限個数：{item.maxQty} 個</p>
            <p>値段：{item.price === 0 ? "無料" : `${item.price}円`}</p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
              サイズ
            </h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {item.size}
            </pre>
          </div>

          <div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
              備考
            </h3>
            <p>{item.note}</p>
          </div>
        </div>
      </div>
    </main>
  );
}