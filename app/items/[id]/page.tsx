import { internalItems, externalItems } from "../../../lib/items";
import Link from "next/link";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: { id: string };
};

export default function ItemDetailPage({ params }: PageProps) {
  const { id } = params;

  const allItems = [...internalItems, ...externalItems];
  const item = allItems.find((i) => i.id === id);

  if (!item) {
    return <p style={{ padding: "40px" }}>物品が見つかりません。</p>;
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