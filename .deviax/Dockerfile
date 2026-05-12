FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
USER 0
RUN printf '%s\n' \
  'server {' \
  '  listen 8080;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '  }' \
  '  location ~* \.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|avif|ico)$ {' \
  '    expires 7d;' \
  '    add_header Cache-Control "public, immutable";' \
  '  }' \
  '  gzip on;' \
  '  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss image/svg+xml;' \
  '}' \
  > /etc/nginx/conf.d/default.conf
USER 101
EXPOSE 8080
