FROM node:16.18.0 as builder
WORKDIR /app
COPY package.json ./
RUN npm install typescript
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r dist/. result_build
