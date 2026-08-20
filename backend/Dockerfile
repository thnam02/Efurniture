FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh && mkdir -p uploads
EXPOSE 4000
ENTRYPOINT ["./docker-entrypoint.sh"]
