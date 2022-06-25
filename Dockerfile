FROM node:14.17.6

WORKDIR /app/my_application

COPY . .

RUN npm install

CMD ["npm", "start"]