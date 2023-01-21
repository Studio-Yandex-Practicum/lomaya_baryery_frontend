FROM node:16.18.0 as builder

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json

RUN npm install typescript
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.16.0
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

