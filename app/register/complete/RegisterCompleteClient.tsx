"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Link from "next/link";

type Item = {
  name: string;
  qty: number;
};

type RegisterData = {
  groupName: string;
  leaderName: string;
  contact: string;
  items: Item[];
  totalPrice: number;
};

export default function RegisterCompleteClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<RegisterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const ref = doc(db, "registrations", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data() as RegisterData);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <p style={{ padding: "40px" }}>読み込み中...</p>;
  if (!data) return <p style={{ padding: "40px" }}>登録情報が見つかりません。</p>;

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        登録完了
      </h1>

      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "24px" }}>
        <p>団体名：{data.groupName}</p>
        <p>企画責任者名：{data.leaderName}</p>
        <p>連絡先：{data.contact}</p>

        <hr style={{ margin: "12px 0" }} />

        {data.items.map((item, i) => (
          <p key={i}>{item.name}　{item.qty} 個</p>
        ))}

        <hr style={{ margin: "12px 0" }} />
        <p style={{ fontWeight: "bold" }}>料金：{data.totalPrice}円</p>
      </div>

      <Link href="/">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#eee",
            border: "1px solid #333",
            cursor: "pointer",
          }}
        >
          トップページへ戻る
        </button>
      </Link>
    </main>
  );
}
