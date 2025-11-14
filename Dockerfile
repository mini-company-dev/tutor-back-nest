# 1. 빌드 스테이지
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# 의존성 설치
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 소스 복사
COPY . .

# 🔥 Prisma Client 생성
RUN pnpm prisma generate

# Next.js 빌드
RUN pnpm run build



# 2. 실행 스테이지
FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# production dependencies만 설치
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# 🔥 Prisma client 복사 (중요)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Next.js 빌드 파일
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Prisma schema도 필요할 수 있음 (서버 함수에서 경로 참조시)
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080
CMD ["pnpm", "start"]
