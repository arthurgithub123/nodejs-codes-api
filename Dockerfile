FROM node

WORKDIR /usr/app

COPY . /usr/app

RUN npm install

EXPOSE 44303

CMD ["npm", "run", "rundev"]