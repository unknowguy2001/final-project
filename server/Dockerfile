FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm i pm2 -g

CMD ["pm2-runtime", "start", "server.js"]

EXPOSE 3000