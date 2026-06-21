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

  // ✅ 通常アイテム用
  const [qty, setQty] = useState(1);

  // ✅ variation用
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    item.variations?.forEach((v) => {
      initial[v.id] = 0;
    });
    return initial;
  });

  // ✅ variation数量変更
  const updateQty = (id: string, newQty: number, maxQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(maxQty, newQty)),
    }));
  };

  // ✅ カート追加
  const handleAddToCart = () => {
    if (item.variations) {
      // ✅ variation
      item.variations.forEach((v) => {
        const q = quantities[v.id];
        if (q > 0) {
          addToCart(
            {
              id: v.id,
              name: `${item.name}（${v.label}）`,
              price: v.price,
              maxQty: v.maxQty,
            },
            q
          );
        }
      });
    } else {
      // ✅ 通常商品
      addToCart(item, qty);
    }

    router.push("/cart");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* ✅ ===== 通常アイテムUI（★ここ追加） ===== */}
      {!item.variations && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty === 1}
            style={{ width: "36px", height: "36px" }}
          >
            −
          </button>

          <span>{qty}</span>

          <button
            onClick={() =>
              setQty((q) =>
                Math.min(item.maxQty ?? 999, q + 1)
              )
            }
            disabled={item.maxQty !== undefined && qty >= item.maxQty}
            style={{ width: "36px", height: "36px" }}
          >
            ＋
          </button>
        </div>
      )}

      {/* ✅ ===== variation UI ===== */}
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
              <p style={{ fontWeight: "bold" }}>{v.label}</p>
              <p>{v.price === 0 ? "無料" : `${v.price}円`}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => updateQty(v.id, qty - 1, v.maxQty)}
                  disabled={qty === 0}
                >
                  −
                </button>

                <span>{qty}</span>

                <button
                  onClick={() => updateQty(v.id, qty + 1, v.maxQty)}
                  disabled={qty === v.maxQty}
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