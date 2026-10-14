import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const ip = request.headers.get('x-real-ip') || 
             request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             '127.0.0.1';

  const blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await supabase.from('blocked_ips').upsert({
    ip,
    blocked_until: blockedUntil,
  });

  return NextResponse.json({ success: true });
}