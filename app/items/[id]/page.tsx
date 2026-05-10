import { internalItems, externalItems } from "../../../lib/items";
import Link from "next/link";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemDetailPage({ params }: PageProps) {
  // ✅ params を await する
  const { id } = await params;

  // ✅ 念のため正規化
  const normalizedId = decodeURIComponent(id).trim();

  // ✅ 学内・学外を統合
  const allItems = [...internalItems, ...externalItems];

  const item = allItems.find((i) => i.id === normalizedId);

  if (!item) {
    return (
      <main style={{ padding: "40px" }}>
        <h2>物品が見つかりません。</h2>
        <p>ID: {normalizedId}</p>

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