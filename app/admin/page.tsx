"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 🔥 Firebase
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

type RegisterData = {
  id: string;
  groupName: string;
  leaderName: string;
  contact: string;
  items: { name: string; qty: number }[];
  totalPrice: number;
  createdAt?: any;
};

export default function AdminPage() {
  const router = useRouter();
  const [list, setList] = useState<RegisterData[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ ログインチェック（Firebase Auth）
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // ✅ Firestore リアルタイム購読
  useEffect(() => {
    const q = 
      collection(db, "registrations");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<RegisterData, "id">),
      }));

      setList(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ 削除処理
  const handleDelete = async (id: string) => {
    const ok = window.confirm("この登録を削除しますか？");
    if (!ok) return;

    await deleteDoc(doc(db, "registrations", id));
  };

  // ✅ ログアウト
  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <main style={{ padding: "40px" }}>
      {/* ヘッダー */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          管理者ページ（登録一覧）
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px",
            border: "1px solid #333",
            backgroundColor: "#eee",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : list.length === 0 ? (
        <p>登録データがありません。</p>
      ) : (
        list.map((data) => (
          <div
            key={data.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "20px",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            {/* 削除ボタン */}
            <button
              onClick={() => handleDelete(data.id)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              削除
            </button>

            <p>
              <strong>団体名：</strong>
              {data.groupName}
            </p>
            <p>
              <strong>企画責任者：</strong>
              {data.leaderName}
            </p>
            <p>
              <strong>連絡先：</strong>
              {data.contact}
            </p>

            <hr style={{ margin: "12px 0" }} />

            {data.items.map((item, i) => (
              <p key={i}>
                {item.name}　{item.qty}個
              </p>
            ))}

            <p style={{ marginTop: "8px", fontWeight: "bold" }}>
              料金：{data.totalPrice}円
            </p>
          </div>
        ))
      )}
    </main>
  );
}