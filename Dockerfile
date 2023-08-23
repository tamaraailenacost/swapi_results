FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3334

CMD [ "npm", "start" ]

## run docker run -p 3334:3334 my-image-name:tag1
