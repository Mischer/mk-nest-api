FROM node:18.20.4-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
EXPOSE 3000
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]