FROM node:22.11-alpine AS builder
WORKDIR /app
RUN npm --global install pnpm
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
RUN chown -R nginx:nginx /var/cache/nginx/ /var/run/ /usr/share/nginx/html/ /etc/nginx/conf.d/
USER nginx
CMD ["nginx", "-g", "daemon off;"]
