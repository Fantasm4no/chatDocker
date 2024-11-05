# Etapa de compilación de Angular
FROM node:18 AS build-stage

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto Angular
COPY chatDocker/ ./chatDocker/

# Instala dependencias y construye la aplicación
RUN cd chatDocker && npm install && npm run build

# Etapa para el servidor Node.js y el despliegue
FROM node:18 AS server-stage

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos generados de la etapa de compilación desde la carpeta `browser`
COPY --from=build-stage /usr/src/app/chatDocker/dist/chat-frontend/browser /usr/src/app/public

# Copia los archivos del servidor, incluyendo el package.json del servidor
COPY package*.json ./  
COPY server.js .       

# Instala las dependencias del servidor Node.js
RUN npm install

# Expone los puertos necesarios para el acceso web
EXPOSE 3000

# Comando para iniciar tu aplicación (servidor Node.js)
CMD ["node", "server.js"]
