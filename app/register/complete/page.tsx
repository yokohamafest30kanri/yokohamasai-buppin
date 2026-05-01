export const dynamic = "force-dynamic";export const revalidate = 0;
export const generateStaticParams = () => [];

import { Suspense } from "react";
import RegisterCompleteClient from "./RegisterCompleteClient";

export default function RegisterCompletePage() {
  return (
    <Suspense fallback={<p style={{ padding: "40px" }}>読み込み中...</p>}>
      <RegisterCompleteClient />
    </Suspense>
  );
}
``
