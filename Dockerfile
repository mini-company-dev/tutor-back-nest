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

# Prisma Client 관련 폴더 복사
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# NestJS dist 파일 복사
COPY --from=builder /app/dist ./dist

# Prisma schema
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]