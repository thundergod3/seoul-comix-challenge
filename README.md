# seoul-comix-challenge

## Setup

```bash
yarn install
pnpm dx
```

### Requirements

- Node >= 18.0.0
- Postgres

## Development

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
```

### How to use
- After running, please access link http://localhost:3000 to view the result