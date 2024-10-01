# Use Node.js como imagem base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copia o restante do código da aplicação
COPY . .

# Compila a aplicação Nest.js
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Inicia o servidor Nest.js
CMD ["npm", "run", "start:dev"]