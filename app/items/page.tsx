import Link from "next/link";

export default function ItemsTopPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        借用物品選択
      </h1>

      <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>
        {/* ===== 学内借用物品 ===== */}
        <li style={{ marginBottom: "30px", maxWidth: "500px" }}>
          <p
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            横浜祭実行委員会や学生団体連合会本部、大学総務課等の
            大学内の団体の物品を借用できます。
          </p>

          <Link href="/items/internal">
            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#FFF9C4", // 🟡 学内：薄い黄色
                border: "1px solid #333",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              学内借用物品一覧へ
            </button>
          </Link>
        </li>

        {/* ===== 学外借用物品 ===== */}
        <li style={{ maxWidth: "500px" }}>
          <p
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            山王スペース＆レンタル株式会社から物品を借用できます。
            <br />
            ※当サイトに載っていないがこういう物品があれば借用したいといった
            要望がある場合は、横浜祭実行委員会管理部までお申し出ください。
          </p>

          <Link href="/items/external">
            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#F3E5F5", // 🟣 学外：薄い紫
                border: "1px solid #333",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              学外借用物品一覧へ
            </button>
          </Link>
        </li>
      </ul>
    </main>
  );
}
``