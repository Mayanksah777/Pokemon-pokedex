# Pokemon Pokedex

A full-stack Pokemon app built with:
- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- tRPC + React Query
- Material UI

## What You Can Do
- `/pokemon`: search one Pokemon by name
- `/pokedex`: search multiple Pokemon by comma-separated names
- `/filterable-pokedex`: filter Pokemon by type + pagination
- `/add-pokemon`: create a new Pokemon from UI

## Quick Start (Supabase - Recommended)
This project works well with Supabase Transaction Pooler.

1. Install dependencies
```powershell
npm install
```

2. Create `.env` (copy from `.env.example`)
```powershell
Copy-Item .env.example .env -Force
```

3. Set `DATABASE_URL` in `.env`
```env
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
```

4. Generate Prisma client
```powershell
npm run prisma:generate
```

5. Start dev server
```powershell
npm run dev
```

6. Open app
- `http://localhost:3000`

## Database Schema
`prisma/schema.prisma`

```prisma
model Pokemon {
  id     Int      @id @default(autoincrement())
  name   String   @unique
  types  String[]
  sprite String

  @@index([name])
  @@index([types], type: Gin)
}
```

## Seed Data
Seed script is in `prisma/seed.ts` (10+ Pokemon).

If your environment supports it:
```powershell
npm run prisma:seed
```

If seeding fails in your local Node setup, insert data using Supabase SQL Editor with equivalent rows.

## Useful Scripts
- `npm run dev` - start development server
- `npm run build` - build production app
- `npm start` - run production build
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:push` - push schema to DB
- `npm run prisma:seed` - run seed script

## Project Structure
```text
app/
  api/trpc/[trpc]/route.ts
  add-pokemon/page.tsx
  filterable-pokedex/page.tsx
  pokedex/page.tsx
  pokemon/page.tsx
components/
  FilterablePokedexTable.tsx
  PokedexTable.tsx
  PokemonRow.tsx
  PokemonTypeSelection.tsx
lib/
  prisma.ts
  trpc.ts
prisma/
  schema.prisma
  seed.ts
server/
  routers/
    _app.ts
    pokemon.ts
  trpc.ts
types/
  pokemon.ts
```

## Troubleshooting
1. `Can't reach database server`
- Check `DATABASE_URL` host/port/password.
- For Supabase pooler, use port `6543`.

2. `prepared statement already exists`
- Ensure URL includes:
- `?pgbouncer=true&connection_limit=1&sslmode=require`

3. `Could not find a production build`
- Use `npm run dev` during development.
- `npm start` only after `npm run build`.
