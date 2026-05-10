"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Item } from "../../../lib/items";
import { useCart } from "../../../context/CartContext";

type Props = {
  item: Item;
};

export default function ItemDetailClient({ item }: Props) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(item, qty);

    // state反映後に遷移
    setTimeout(() => {
      router.push("/cart");
    }, 0);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {/* ===== 数量操作 ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* − ボタン（1のときは押せない） */}
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty === 1}
          style={{
            width: "36px",
            height: "36px",
            cursor: qty === 1 ? "not-allowed" : "pointer",
            opacity: qty === 1 ? 0.4 : 1,
          }}
        >
          −
        </button>

        <span style={{ minWidth: "24px", textAlign: "center" }}>
          {qty}
        </span>

        {/* ＋ ボタン（✅ 上限のときは押せない） */}
        <button
          onClick={() => setQty((q) => Math.min(item.maxQty, q + 1))}
          disabled={qty === item.maxQty}
          style={{
            width: "36px",
            height: "36px",
            cursor: qty === item.maxQty ? "not-allowed" : "pointer",
            opacity: qty === item.maxQty ? 0.4 : 1,
          }}
        >
          ＋
        </button>
      </div>

      {/* ===== カートに追加 ===== */}
      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        カートに追加して確認
      </button>
    </div>
  );
}