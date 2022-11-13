FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force

COPY . .

EXPOSE 4200

CMD ["npm", "start"]