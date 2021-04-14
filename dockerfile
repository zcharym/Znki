FROM node:14
WORKDIR /app
COPY ./package.json ./
RUN npm install --registry=https://registry.npm.taobao.org \
     && set NODE_ENV=production \
     && npx prisma gernerate --schema=./prisma/schema.prisma \
     && npm run build
COPY ./dist .
EXPOSE 3000
RUN node main.js
