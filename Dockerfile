FROM node:14-alpine as Builder

WORKDIR ./app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:14-alpine as Final

WORKDIR /app

COPY --from=Builder /app ./

EXPOSE 3000

CMD ["node", "index.js"]

