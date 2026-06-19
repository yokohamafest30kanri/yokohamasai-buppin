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
  const [isNotMogi, setIsNotMogi] = useState(false);

  // ✅ ←ここが重要（price安全化）
  const totalPrice = isNotMogi
    ? 0
    : cart.reduce(
        (sum, item) => sum + (item.price ?? 0) * item.qty,
        0
      );

  const handleSubmit = async () => {
    if (cart.length === 0) {
      alert("カートが空です");
      return;
    }

    if (!groupName.trim() || !leaderName.trim() || !contact.trim()) {
      alert("すべての項目を入力してください");
      return;
    }

    if (!contact.includes("@")) {
      alert("正しいメールアドレスを入力してください");
      return;
    }

    if (!confirm("この内容で登録しますか？")) {
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        groupName: groupName.trim(),
        leaderName: leaderName.trim(),
        contact: contact.trim(),
        isNotMogi,
        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
        })),
        totalPrice,
        createdAt: new Date(),
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
      } catch {
        // メール失敗は無視
      }

      router.push(`/register/complete?id=${docRef.id}`);
      clearCart();
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "10px", fontWeight: "bold" }}>
        借用物品登録
      </h1>

      {/* チェック */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          marginBottom: "20px",
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

      {/* カート */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>カート</h2>

        {cart.length === 0 ? (
          <p>カートに物品が入っていません。</p>
        ) : (
          cart.map((item) => {
            const price = item.price ?? 0;

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>
                  {item.name} {item.qty}個
                </span>
                <span>
                  {isNotMogi
                    ? "0円"
                    : price === 0
                    ? "0円"
                    : `${price * item.qty}円`}
                </span>
              </div>
            );
          })
        )}

        <hr style={{ margin: "12px 0" }} />
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          料金 {totalPrice}円
        </div>
      </div>

      {/* 入力 */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>お客様情報</h2>

        <div style={{ marginBottom: "12px" }}>
          <label>団体名</label>
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>企画責任者名</label>
          <input
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* ボタン */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Link href="/cart" style={{ width: "100%", maxWidth: "260px" }}>
          <button
            style={{
              width: "100%",
              padding: "12px",
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
            !groupName.trim() ||
            !leaderName.trim() ||
            !contact.trim() ||
            cart.length === 0
          }
          style={{
            width: "100%",
            maxWidth: "260px",
            padding: "12px",
            backgroundColor:
              loading ||
              !groupName.trim() ||
              !leaderName.trim() ||
              !contact.trim() ||
              cart.length === 0
                ? "#aaa"
                : "#4caf50",
            color: "#fff",
            border: "none",
            cursor:
              loading ||
              !groupName.trim() ||
              !leaderName.trim() ||
              !contact.trim() ||
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
``