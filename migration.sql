-- Add missing columns to user_airdrops table to support custom airdrops
alter table public.user_airdrops add column if not exists name text;
alter table public.user_airdrops add column if not exists chain text;
alter table public.user_airdrops add column if not exists difficulty text;
alter table public.user_airdrops add column if not exists link text;
alter table public.user_airdrops add column if not exists tags text[];
alter table public.user_airdrops add column if not exists description text;
alter table public.user_airdrops add column if not exists quests text[];
