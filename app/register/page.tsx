"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import emailjs from "@emailjs/browser";

export default function RegisterPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 追加：模擬店企画じゃないチェック
  const [isNotMogi, setIsNotMogi] = useState(false);

  // ✅ 合計金額（チェックされていたら0円）
  const totalPrice = isNotMogi
    ? 0
    : cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async () => {
    if (cart.length === 0) {
      alert("カートが空です");
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        groupName,
        leaderName,
        contact,
        isNotMogi,
        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
        })),
        totalPrice,
      });

      try {
        await emailjs.send(
          "service_yfa_buppin",
          "template_buppin",
          {
            to_email: contact,
            groupName,
            leaderName,
            items: cart
              .map((item) => `・${item.name} × ${item.qty}`)
              .join("\n"),
            totalPrice,
          },
          "n9TC480wM5ZmokY9N"
        );
      } catch (mailError) {
        console.error("メール送信エラー:", mailError);
      }

      router.push(`/register/complete?id=${docRef.id}`);
      clearCart();
    } catch (error) {
      console.error("Firestore保存エラー:", error);
      alert("登録に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "12px" }}>
        借用物品登録
      </h1>

      {/* ✅ チェックボックス */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
          fontSize: "14px",
        }}
      >
        <input
          type="checkbox"
          checked={isNotMogi}
          onChange={(e) => setIsNotMogi(e.target.checked)}
        />
        模擬店企画団体ではない場合はチェックしてください。
      </label>

      {/* === カート確認 === */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>カート</h2>

        {cart.length === 0 ? (
          <p>カートに物品が入っていません。</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>
                {item.name}　{item.qty}個
              </span>
              <span>
                {isNotMogi
                  ? "0円"
                  : item.price === 0
                  ? "0円"
                  : `${item.price * item.qty}円`}
              </span>
            </div>
          ))
        )}

        <hr style={{ margin: "12px 0" }} />
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          料金 {totalPrice}円
        </div>
      </div>

      {/* === 団体情報 === */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>お客様情報</h2>

        <div style={{ marginBottom: "12px" }}>
          <label>団体名</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ width: "98%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>企画責任者名</label>
          <input
            type="text"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            style={{ width: "98%", padding: "8px" }}
          />
        </div>

        <div>
          <label>連絡先（メールアドレス）</label>
          <input
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ width: "98%", padding: "8px" }}
          />
        </div>
      </div>

      {/* === ボタン === */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/cart">
          <button
            style={{
              padding: "10px 16px",
              border: "1px solid #333",
              backgroundColor: "#eee",
            }}
          >
            カートへ戻る
          </button>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !groupName ||
            !leaderName ||
            !contact ||
            cart.length === 0
          }
          style={{
            padding: "10px 20px",
            backgroundColor:
              loading ||
              !groupName ||
              !leaderName ||
              !contact ||
              cart.length === 0
                ? "#aaa"
                : "#4caf50",
            color: "#fff",
            border: "none",
            cursor:
              loading ||
              !groupName ||
              !leaderName ||
              !contact ||
              cart.length === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </div>
    </main>
  );
}