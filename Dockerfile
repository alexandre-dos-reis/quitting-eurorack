FROM node:16 as builder
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN mkdir /app
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
ADD . .
RUN pnpm build

FROM lipanski/docker-static-website:latest
COPY --from=builder /app/dist .