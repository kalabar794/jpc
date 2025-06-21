import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Generate cryptographically secure random token using Web Crypto API
async function generateSecureToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function generateCSRFToken(): Promise<string> {
  const token = await generateSecureToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  
  return token;
}

export async function getCSRFToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_NAME)?.value;
}

export async function validateCSRFToken(headerToken: string | null): Promise<boolean> {
  if (!headerToken) {
    return false;
  }
  
  const cookieToken = await getCSRFToken();
  return cookieToken === headerToken;
}

export { CSRF_HEADER_NAME };