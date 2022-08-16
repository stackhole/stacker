FROM node:17-alpine

COPY . .
RUN npm install
RUN npm ci

CMD ["node", "index.js"]
