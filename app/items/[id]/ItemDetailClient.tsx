"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Item } from "../../../lib/items";
import { useCart } from "../../../context/CartContext";

type Props = {
  item: Item;
};

export default function ItemDetailClient({ item }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  // ✅ variationごとの数量
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    item.variations?.forEach((v) => {
      initial[v.id] = 0;
    });
    return initial;
  });

  // ✅ 数量変更
  const updateQty = (id: string, newQty: number, maxQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(maxQty, newQty)),
    }));
  };

  // ✅ カート追加
  const handleAddToCart = () => {
    if (!item.variations) return;

    item.variations.forEach((v) => {
      const qty = quantities[v.id];
      if (qty > 0) {
        addToCart(
          {
            id: v.id,
            name: `${item.name}（${v.label}）`,
            price: v.price,
            maxQty: v.maxQty,
          },
          qty
        );
      }
    });

    router.push("/cart");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* ✅ バリエーションUI */}
      {item.variations &&
        item.variations.map((v) => {
          const qty = quantities[v.id];

          return (
            <div
              key={v.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
                maxWidth: "400px",
              }}
            >
              {/* サイズ */}
              <p style={{ fontWeight: "bold", marginBottom: "6px" }}>
                {v.label}
              </p>

              <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                {v.price === 0 ? "無料" : `${v.price}円`}
              </p>

              {/* 数量操作 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* − */}
                <button
                  onClick={() => updateQty(v.id, qty - 1, v.maxQty)}
                  disabled={qty === 0}
                  style={{
                    width: "36px",
                    height: "36px",
                    cursor: qty === 0 ? "not-allowed" : "pointer",
                    opacity: qty === 0 ? 0.4 : 1,
                  }}
                >
                  −
                </button>

                <span style={{ minWidth: "20px", textAlign: "center" }}>
                  {qty}
                </span>

                {/* ＋ */}
                <button
                  onClick={() => updateQty(v.id, qty + 1, v.maxQty)}
                  disabled={qty === v.maxQty}
                  style={{
                    width: "36px",
                    height: "36px",
                    cursor: qty === v.maxQty ? "not-allowed" : "pointer",
                    opacity: qty === v.maxQty ? 0.4 : 1,
                  }}
                >
                  ＋
                </button>
              </div>
            </div>
          );
        })}

      {/* ✅ カートボタン */}
      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "14px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        カートに追加して確認
      </button>
    </div>
  );
}
