FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./backend/package.json .

RUN npm install

COPY ./backend .

RUN npx prisma generate

CMD ["npm", "start"]
