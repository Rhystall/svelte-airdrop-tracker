import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Database features will not work.');
}

export const supabase = createClient(
    PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);
