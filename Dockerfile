# ------------------------
# 1. Build Stage
# ------------------------
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy all source
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build NestJS
RUN pnpm build


# ------------------------
# 2. Runtime Stage
# ------------------------
FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# install only production deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]
