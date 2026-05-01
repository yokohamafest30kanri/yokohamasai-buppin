"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  return (
    <main style={{ padding: "40px" }}>
      {/* タイトル */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        カート
      </h1>

      {/* カート一覧 */}
      <div style={{ marginBottom: "32px" }}>
        {cart.length === 0 ? (
          <p>カートに物品が入っていません。</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "12px",
                gap: "16px",
              }}
            >

              {/* 内容 */}
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: "4px" }}>
                  {item.name}
                </p>

                {/* ✅ − / 個数 / ＋ */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <button
                    onClick={() => {
                      if (item.qty === 1) {
                        removeFromCart(item.id);
                      } else {
                        updateQty(item.id, item.qty - 1);
                      }
                    }}
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => {
                      if (item.qty < item.maxQty) {
                        updateQty(item.id, item.qty + 1);
                      }
                    }}
                  >
                    ＋
                  </button>
                </div>

                <p style={{ fontSize: "14px", color: "#555" }}>
                  {item.price === 0
                    ? `0円 × ${item.qty}個 = 0円`
                    : `${item.price}円 × ${item.qty}個 = ${
                        item.price * item.qty
                      }円`}
                </p>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>

      {/* 下部ボタン */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/items">
          <button
            style={{
              padding: "10px 16px",
              border: "1px solid #333",
              backgroundColor: "#eee",
              cursor: "pointer",
            }}
          >
            物品を追加する
          </button>
        </Link>

        {cart.length === 0 ? (

          <button
            disabled
            style={{
              padding: "10px 16px",
              border: "none",
              backgroundColor: "#aaa",
              color: "#fff",
              cursor: "not-allowed",
            }}
            >
            登録へ進む
          </button>
        ) : (
          <Link href="/register">
            <button
              style={{
                padding: "10px 16px",
                border: "none",
                backgroundColor: "#4caf50",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              登録へ進む
            </button>
          </Link>
        )}
      </div>
    </main>
  );
}