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
    // ✅ 1. カートに追加
    addToCart(item, qty);

    // ✅ 2. state更新を待ってから遷移（超重要）
    setTimeout(() => {
      router.push("/cart");
    }, 0);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {/* 数量操作 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <button onClick={() => setQty(q => Math.max(1, q - 1))}>
          −
        </button>

        <span>{qty}</span>

        <button
          onClick={() => setQty(q => Math.min(item.maxQty, q + 1))}
        >
          ＋
        </button>
      </div>

      {/* ✅ カートに追加 → 自動でカートへ */}
      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        カートに追加して確認
      </button>
    </div>
  );
}