import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // Force revalidate all paths
    revalidatePath('/', 'layout');
    revalidatePath('/admin', 'layout');
    revalidatePath('/api/tina', 'layout');
    
    // Clear module cache
    if (process.env.NODE_ENV !== 'production') {
      // In development, we can clear require cache
      Object.keys(require.cache).forEach((key) => {
        if (key.includes('tina') || key.includes('__generated__')) {
          delete require.cache[key];
        }
      });
    }
    
    // Return cache-busting headers
    return new NextResponse('Cache cleared successfully', {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
        'Clear-Site-Data': '"cache", "storage"',
      },
    });
  } catch (error) {
    console.error('Force refresh error:', error);
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}