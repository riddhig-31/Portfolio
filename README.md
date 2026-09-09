# Riddhi Gupta — Portfolio

A dynamic, entry-based portfolio. Tiles are sized by importance and recency,
sync live across every visitor via Supabase realtime, and can only be added
or removed by you, signed in through a magic-link email.

## 1. Create the backend (5 minutes, free)

1. Go to [supabase.com](https://supabase.com) → New project. Free tier, no card required.
2. Once it's ready, open **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates the `tiles` table, locks
   writes to signed-in users only, turns on realtime sync, and seeds it with
   your current work.
3. Go to **Authentication → Providers** and make sure **Email** is enabled
   (it is by default). Go to **Authentication → URL Configuration** and add
   your eventual site URL (e.g. `https://riddhigupta.online`) to the
   allowed redirect list once you have it.
4. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon public** key — you'll need both next.

## 2. Run it locally

```bash
npm install
cp .env.example .env
# paste your Project URL and anon key into .env
npm run dev
```

Open the local URL it prints. You should see the site with the seeded
tiles. Click "Owner sign in" in the bottom right and enter your own email
to get a magic link — once you click it, you can add and remove tiles.

## 3. Deploy it for real (free)

The fastest path is Vercel:

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) → New Project → import that repo.
3. Under **Environment Variables**, add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` with the same values from your `.env`.
4. Deploy. You'll get a live URL in about a minute.
5. To use your own domain (e.g. riddhigupta.online), go to the project's
   **Domains** tab in Vercel and follow the DNS instructions — then go back
   to Supabase's Auth → URL Configuration and make sure that final domain
   is in the allowed redirect list, or the magic link won't work.

## Editing content

Once deployed, you don't need to touch code to add new work — sign in on
the live site and use "+ New entry." Everything else (removing existing
work, editing the two "constant" tiles) can be done directly in Supabase's
**Table Editor**, under the `tiles` table.

## Design notes

- Type scale and palette live in `tailwind.config.js` — change `accent`,
  `burgundy`, `ink` etc. there to retheme everything at once.
- Tile sizing logic (`computeScore`, `sizeForRank`) is in `src/lib/types.ts`.
  Importance is 1–5; recency adds a temporary boost for ~30 days after
  publishing, then fades.
