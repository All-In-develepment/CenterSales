FROM node:20-alpine

WORKDIR /app

RUN chown node:node /app

RUN apk add --no-cache tzdata

COPY package*.json ./

# Limpe o cache do npm
RUN npm cache clean --force

RUN npm install --legacy-peer-deps

COPY . .

ENV TZ=America/Sao_Paulo

EXPOSE 3333

CMD ["npm", "start"]