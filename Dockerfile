FROM node:9-alpine

#Establecer directorio de trabajo
WORKDIR /app

#Instala los paquetes existentes en el package.json
COPY package.json .
RUN npm install --quiet

COPY server.js .
COPY db.js .
COPY index.js .
COPY .env .
COPY app ./app
COPY config ./config

EXPOSE 3000
CMD ["npm", "start"]