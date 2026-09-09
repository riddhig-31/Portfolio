-- Run this once in your Supabase project's SQL editor (Database > SQL Editor > New query)

create extension if not exists "pgcrypto";

create table if not exists public.tiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('project','ai','post','brand','doc','note')),
  line text not null,
  description text default '',
  url text default '',
  importance int not null default 3 check (importance between 1 and 5),
  is_constant boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.tiles enable row level security;

-- Anyone visiting the site can read published tiles.
create policy "Public can read tiles"
  on public.tiles for select
  using (true);

-- Only a signed-in user (you, via magic link) can write.
create policy "Authenticated can insert tiles"
  on public.tiles for insert
  to authenticated
  with check (true);

create policy "Authenticated can update tiles"
  on public.tiles for update
  to authenticated
  using (true);

create policy "Authenticated can delete tiles"
  on public.tiles for delete
  to authenticated
  using (true);

-- Enable realtime updates for this table
alter publication supabase_realtime add table public.tiles;

-- Seed with your current work — edit freely, or delete and add your own via the site.
insert into public.tiles (name, type, line, description, importance, is_constant, published_at) values
(
  'Master''s Union — PGP TBM',
  'note',
  'Currently in Cohort 7, aiming at consulting and founder''s-office roles.',
  'One year into the 16-month TBM program. Locked consulting and FOCOS as primary placement domains after analyzing MU''s own placement data — marketing underperformed on both offer volume and pay relative to initial assumptions.',
  5, true, now() - interval '3 weeks'
),
(
  'Resume',
  'doc',
  'RAC-format, consulting-ready, no jargon.',
  'Written in Result → Action → Context format, using generalist business language throughout.',
  4, true, now() - interval '2 months'
),
(
  'unOkhi',
  'brand',
  'A fragrance brand built on the nine planets.',
  'An attar-based perfume brand structured around the Navagraha concept, with a birth-planet quiz that leads into a purchase funnel. Shipped packaging across four scents — Kinara, Baagh, Donut, Toofaan — and ran a pop-up retail stall.',
  5, false, now() - interval '10 days'
),
(
  'Trivia Royale',
  'ai',
  'Real-time multiplayer trivia, built for 300 people.',
  'A live multiplayer trivia game built with Lovable and Supabase for a 300-person cohort party.',
  4, false, now() - interval '2 months'
),
(
  'TGC 2026',
  'project',
  'Urban compliance tech for Maharashtra.',
  'The Governance Challenge 2026 — a case competition on urban compliance technology, with Bhumika Rampuria and Dhruv Singhal.',
  4, false, now() - interval '2 weeks'
),
(
  'goSTOPS Case Comp',
  'project',
  'A monsoon-season experiential travel circuit.',
  'Go-to-market strategy for goSTOPS built around a monsoon-season experiential travel circuit.',
  3, false, now() - interval '2 months'
);
