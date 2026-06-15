export const metadata = {
  title: "カート",
};

"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* タイトル */}
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        カート
      </h1>

      {/* カート一覧 */}
      <div style={{ marginBottom: "30px" }}>
        {cart.length === 0 ? (
          <p>カートに物品が入っていません。</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexWrap: "wrap", // ✅ スマホ対応
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
                gap: "12px",
              }}
            >
              {/* 内容 */}
              <div style={{ flex: "1", minWidth: "220px" }}>
                <p style={{ marginBottom: "6px", fontWeight: "bold" }}>
                  {item.name}
                </p>

                {/* 数量操作 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                    disabled={item.qty === 1}
                    style={{
                      padding: "4px 10px",
                      cursor:
                        item.qty === 1 ? "not-allowed" : "pointer",
                      opacity: item.qty === 1 ? 0.4 : 1,
                    }}
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(
                        item.id,
                        Math.min(item.maxQty, item.qty + 1)
                      )
                    }
                    disabled={item.qty === item.maxQty}
                    style={{
                      padding: "4px 10px",
                      cursor:
                        item.qty === item.maxQty
                          ? "not-allowed"
                          : "pointer",
                      opacity: item.qty === item.maxQty ? 0.4 : 1,
                    }}
                  >
                    ＋
                  </button>
                </div>

                {/* 金額 */}
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
                  padding: "8px 14px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "120px", // ✅ スマホでもバランス良い
                }}
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===== 下部ボタン ===== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // ✅ スマホで縦並び
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        {/* 左：追加ボタン */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <Link href="/items/internal">
            <button
              style={{
                padding: "12px",
                width: "100%", // ✅ スマホ用
                maxWidth: "260px",
                border: "1px solid #333",
                backgroundColor: "#FFF9C4",
                cursor: "pointer",
              }}
            >
              学内借用物品を追加する
            </button>
          </Link>

          <Link href="/items/external">
            <button
              style={{
                padding: "12px",
                width: "100%",
                maxWidth: "260px",
                border: "1px solid #333",
                backgroundColor: "#F3E5F5",
                cursor: "pointer",
              }}
            >
              学外借用物品を追加する
            </button>
          </Link>
        </div>

        {/* 右：登録へ進む */}
        <div style={{ width: "100%", maxWidth: "260px" }}>
          {cart.length === 0 ? (
            <button
              disabled
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#aaa",
                color: "#fff",
                border: "none",
                cursor: "not-allowed",
              }}
            >
              登録へ進む
            </button>
          ) : (
            <Link href="/register">
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                登録へ進む
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}