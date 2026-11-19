FROM node:22-slim AS frontend
WORKDIR /app/Front_End
COPY Front_End/package.json Front_End/yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-engines
COPY Front_End ./
RUN yarn build

FROM oven/bun:1
WORKDIR /app/Back_End
COPY Back_End/package.json Back_End/bun.lock ./
RUN bun install --production
COPY Back_End ./
COPY --from=frontend /app/Front_End/dist /app/public
ENV NODE_ENV=production
ENV FRONTEND_DIST=/app/public
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "bun src/drizzle/migrate.ts && bun src/drizzle/seed.ts && bun src/server.ts"]
