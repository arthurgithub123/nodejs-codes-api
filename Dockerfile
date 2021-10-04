FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 44303

CMD ["npm", "run", "rundev"]
