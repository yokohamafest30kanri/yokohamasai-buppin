import { internalItems, externalItems } from "../../../lib/items";
import Image from "next/image";
import Link from "next/link";
import ItemDetailClient from "./ItemDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const allItems = [...internalItems, ...externalItems];
  const item = allItems.find((i) => i.id === decodedId);

  if (!item) {
    return <main style={{ padding: "40px" }}>物品が見つかりません。</main>;
  }

  // ✅ 学外 or 学内 判定
  const isExternal = externalItems.some((i) => i.id === item.id);

  return (
    <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        物品詳細
      </h1>

      {/* ===== 上段：画像＋情報 ===== */}
      <div style={{ display: "flex", gap: "32px" }}>
        {/* 左：画像 */}
        <div
          style={{
            width: "360px",
            height: "360px",
            border: "1px solid #999",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

        {/* 右：説明 */}
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
            <pre style={{ whiteSpace: "pre-wrap" }}>{item.size}</pre>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontWeight: "bold" }}>備考</h3>
            <p>{item.note}</p>
          </div>
        </div>
      </div>

      {/* ===== カート操作枠 ===== */}
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

      {/* ✅ 追加：一覧へ戻るボタン ===== */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Link href={isExternal ? "/items/external" : "/items/internal"}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#eee",
              border: "1px solid #333",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isExternal
              ? "学外物品一覧に戻る"
              : "学内物品一覧に戻る"}
          </button>
        </Link>
      </div>
    </main>
  );
}