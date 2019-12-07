FROM node:9-alpine

#Establecer directorio de trabajo
WORKDIR /transfers

#Instala los paquetes existentes en el package.json
COPY package.json .
RUN npm install --quiet

#Copia los archivos del proyecto
COPY index.js .
COPY app ./app

#Abre el puerto 3000 y ejecuta la aplicación
EXPOSE 3000
CMD ["npm", "start"]