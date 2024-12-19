import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import linguiConfig from '../lingui.config'

const { locales, sourceLocale } = linguiConfig

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 排除静态资源和API路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg)$/)
  ) {
    return NextResponse.next()
  }

  // 检查是否已包含语言前缀
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // 重定向到默认语言路径
  const newUrl = new URL(
    `/${sourceLocale}${pathname}${request.nextUrl.search}`,
    request.url
  )
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
