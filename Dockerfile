FROM node:18-slim

WORKDIR /app

# Copy package.json and package-lock.json from visitor-counter-api
COPY visitor-counter-api/package*.json ./

RUN npm install --omit=dev

# Copy server file
COPY visitor-counter-api/server.js ./

# Copy public frontend
COPY public/ ./public

EXPOSE 8080

CMD ["node", "server.js"]
