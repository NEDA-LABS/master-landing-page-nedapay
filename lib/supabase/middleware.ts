import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refreshes the Supabase auth session on every request and guards the
 * /admin area — unauthenticated visitors are sent to /admin/login.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured yet, don't block the public site.
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdmin = path.startsWith('/admin');
  const isLogin = path === '/admin/login';

  if (isAdmin && !isLogin && !user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = '/admin/login';
    redirect.searchParams.set('next', path);
    return NextResponse.redirect(redirect);
  }

  // Already signed in → skip the login page.
  if (isLogin && user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = '/admin';
    redirect.search = '';
    return NextResponse.redirect(redirect);
  }

  return response;
}
