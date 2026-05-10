import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ トップページだけ許可
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ✅ 管理者ログインだけ例外で許可したい場合（任意）
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ✅ それ以外はトップへリダイレクト
  return NextResponse.redirect(new URL("/", request.url));
}