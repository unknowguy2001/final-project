FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm i pm2 -g

CMD ["sh", "-c", "sleep 10 && npx prisma migrate deploy && pm2-runtime server.js"]

EXPOSE 3000