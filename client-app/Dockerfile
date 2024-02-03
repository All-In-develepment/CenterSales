FROM node:20.9.0-alpine3.17

WORKDIR /app

# COPY package*.json ./

COPY . .

# RUN npm update --save

RUN npm install

# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]