FROM node:17-alpine

COPY . .
RUN npm ci
RUN npm run build

CMD ["node", "dist/index.js"]
