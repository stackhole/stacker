FROM node:18-alpine

COPY . .
RUN npm ci
RUN npm run build

CMD ["node", "dist/index.js"]
