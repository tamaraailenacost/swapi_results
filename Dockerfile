FROM node:14

WORKDIR /app

# Copia el package.json y package-lock.json al /app del container
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3334

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]

## run docker run -p 3334:3334 my-image-name:tag1
