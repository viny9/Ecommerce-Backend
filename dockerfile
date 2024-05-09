FROM node:22

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install 

COPY . .

ENV DATABASE_URL=""

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]