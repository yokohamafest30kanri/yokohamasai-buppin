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

  const isExternal = externalItems.some((i) => i.id === item.id);

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        物品詳細
      </h1>

      {/* ===== 上段 ===== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {/* 画像 */}
        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            aspectRatio: "1 / 1",
            border: "1px solid #999",
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={360}
              height={360}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span style={{ color: "#666" }}>写真</span>
          )}
        </div>

        {/* 説明 */}
        <div style={{ flex: "1", minWidth: "260px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
            {item.name}
          </h2>

          <p style={{ marginTop: "12px", lineHeight: 1.6 }}>
            {item.description}
          </p>

          {/* ✅ 通常商品 */}
          {!item.variations && (
            <div style={{ marginTop: "16px" }}>
              <p>上限個数：{item.maxQty} 個</p>
              <p>
                通常価格：
                {item.price === 0 ? " 無料" : ` ${item.price}円 / 個`}
              </p>
            </div>
          )}

          {/* ✅ variation商品 */}
          {item.variations && (
            <div style={{ marginTop: "16px" }}>
              <p>
                通常料金：
                {Math.min(...item.variations.map((v) => v.price))}円 / 個〜
              </p>

              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                {item.variations.map((v) => (
                  <li key={v.id}>
                    {v.label}（最大 {v.maxQty}）
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ サイズ */}
          {item.size && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontWeight: "bold" }}>サイズ</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {item.size}
              </pre>
            </div>
          )}

          {/* ✅ ガス（←ここに配置した） */}
          {item.gas && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontWeight: "bold" }}>ガス使用量</h3>
              <p>{item.gas}</p>
            </div>
          )}

          {/* ✅ 備考 */}
          {item.note && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontWeight: "bold" }}>備考</h3>
              <p>{item.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* 操作用UI */}
      <div
        style={{
          marginTop: "30px",
          padding: "16px",
          border: "1px solid #ccc",
          backgroundColor: "#eef6fa",
        }}
      >
        <ItemDetailClient item={item} />
      </div>

      {/* 戻る */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link href={isExternal ? "/items/external" : "/items/internal"}>
          <button
            style={{
              padding: "12px 20px",
              width: "100%",
              maxWidth: "300px",
              backgroundColor: isExternal
                ? "#F3E5F5"
                : "#FFF9C4",
              border: "1px solid #333",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {isExternal
              ? "学外借用物品一覧に戻る"
              : "学内借用物品一覧に戻る"}
          </button>
        </Link>
      </div>
    </main>
  );
}