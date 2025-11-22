-- Create users table
create table public.users (
  wallet_address text primary key,
  name text,
  role text,
  bio text,
  goals text,
  onboarding_dismissed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_airdrops table
create table public.user_airdrops (
  id uuid default gen_random_uuid() primary key,
  user_wallet_address text references public.users(wallet_address) not null,
  slug text not null,
  completed_quests integer default 0,
  status text,
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_wallet_address, slug)
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.user_airdrops enable row level security;

-- Allow all access for now (since we don't have Supabase Auth integrated yet)
-- WARNING: This is insecure for production but allows the prototype to work without auth
create policy "Allow all access to users" on public.users for all using (true) with check (true);
create policy "Allow all access to user_airdrops" on public.user_airdrops for all using (true) with check (true);
