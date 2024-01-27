FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist

RUN npm i -g serve

EXPOSE 5173

CMD ["serve", "-s", "./dist", "-p", "5173"]