FROM node:16 as builder
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN pnpm install --prod && pnpm build

# https://github.com/PierreZ/goStatic
FROM pierrezemb/gostatic:latest
COPY --from=builder /app/dist /srv/http
EXPOSE 8043
CMD ["goStatic"]