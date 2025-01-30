FROM node:22-alpine AS builder
WORKDIR /app
RUN npm --global install pnpm
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
