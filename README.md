# Pokemon Pokedex (Next.js + Prisma + tRPC + MUI)

## Tech Stack
- Next.js App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- tRPC + React Query
- Material UI

## Routes
- `/pokemon` - fetch a single Pokemon by name
- `/pokedex` - fetch multiple Pokemon by comma-separated names
- `/filterable-pokedex` - filter Pokemon by type with pagination
- `/add-pokemon` - create a new Pokemon record from UI

## Project Structure
```text
app/
  api/trpc/[trpc]/route.ts
  add-pokemon/page.tsx
  filterable-pokedex/page.tsx
  pokedex/page.tsx
  pokemon/page.tsx
  globals.css
  layout.tsx
  page.tsx
  providers.tsx
  theme.ts
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

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env`:
```bash
cp .env.example .env
```

3. Start PostgreSQL and ensure `DATABASE_URL` in `.env` is valid.

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate -- --name init
```

6. Seed the database:
```bash
npm run prisma:seed
```

7. Run development server:
```bash
npm run dev
```
