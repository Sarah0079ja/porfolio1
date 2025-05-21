FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY server.js ./
COPY assets ./assets   # copy your assets folder if needed

EXPOSE 8080

CMD ["node", "server.js"]