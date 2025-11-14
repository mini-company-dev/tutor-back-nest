# ------------------------
# 1. Build Stage
# ------------------------
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# Prisma Client 생성
RUN pnpm prisma generate

# NestJS Build
RUN pnpm build


# ------------------------
# 2. Runtime Stage
# ------------------------
FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# 소스 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# ⭐ Prisma Client 재생성 (100% 필수)
RUN pnpm prisma generate

EXPOSE 3000
CMD ["node", "dist/main.js"]