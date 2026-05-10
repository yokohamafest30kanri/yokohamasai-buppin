import { internalItems, externalItems } from "../../../lib/items";
import Link from "next/link";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: { id: string };
};

export default function ItemDetailPage({ params }: PageProps) {
  // ✅ パラメータを正規化
  const normalizedId = decodeURIComponent(params.id).trim().toLowerCase();

  // ✅ 学内・学外を統合
  const allItems = [...internalItems, ...externalItems];

  // ✅ 正規化した id で検索
  const item = allItems.find(
    (i) => i.id.toLowerCase() === normalizedId
  );

  if (!item) {
    return (
      <main style={{ padding: "40px" }}>
        <h2>物品が見つかりません。</h2>
        <p style={{ color: "#666" }}>
          指定された物品ID: {normalizedId}
        </p>
        <Link href="/items">
          <button style={{ marginTop: "16px" }}>
            物品一覧に戻る
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>物品詳細</h1>

      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ width: "260px", flexShrink: 0 }}>
          <ItemDetailClient item={item} />

          <Link href="/items">
            <button style={{ marginTop: "15px" }}>
              物品一覧に戻る
            </button>
          </Link>
        </div>

        <div style={{ flex: 1 }}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </main>
  );
}