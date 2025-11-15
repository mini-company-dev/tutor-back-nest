# 공식 Node.js 이미지를 기본 이미지로 사용합니다.
FROM node:22-alpine AS builder

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json 및 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# Prisma 클라이언트를 위한 추가 종속성을 설치합니다.
RUN npm install prisma@latest

# 모든 종속성을 설치합니다.
RUN npm install

# NestJS 소스 코드를 복사합니다.
COPY . .

# Prisma 클라이언트를 빌드합니다.
RUN npm run build

# 최종 이미지를 위한 기본 런타임 이미지를 설정합니다.
FROM node:22-alpine AS runner

# 데이터베이스 마이그레이션 및 앱 실행에 필요한 파일들을 복사합니다.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Prisma CLI와 관련된 실행 권한을 부여합니다.
RUN chmod +x ./node_modules/.bin/prisma

# 앱이 시작될 때 Prisma 마이그레이션을 적용합니다.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
