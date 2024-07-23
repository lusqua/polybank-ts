# Use a imagem oficial do Node.js como imagem base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do aplicativo para o diretório de trabalho
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta 4000
EXPOSE 4000

# Comando para rodar o aplicativo
CMD ["npm", "start"]