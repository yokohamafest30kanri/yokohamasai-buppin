import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "40px", position: "relative" }}>
      {/* 右上：管理者ログイン */}
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <Link href="/admin" style={{ fontSize: "14px" }}>
          管理者ログイン
        </Link>
      </div>

      {/* タイトル */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        第30回 横浜祭 借用物品登録サイト
      </h1>

      {/* 説明文 */}
      <p style={{ marginTop: "12px", fontSize: "16px" }}>
        ここから借用物品の登録・申請を行ってください。
        \n※当サイトの価格表示は模擬店企画向けとなっております。
        \n※模擬店企画団体以外の団体は原則無料で借用できます。
      </p>

      {/* 中央のメインボタン */}
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Link href="/items">
          <button
            style={{
              padding: "20px 60px",
              fontSize: "20px",
              borderRadius: "8px",
              backgroundColor: "#8fb6d9",
              border: "2px solid #333",
              cursor: "pointer",
            }}
          >
            借用物品を登録する
          </button>
        </Link>
      </div>
    </main>
  );
}