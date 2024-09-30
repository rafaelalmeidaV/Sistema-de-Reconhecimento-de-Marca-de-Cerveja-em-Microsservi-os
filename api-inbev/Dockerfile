# Use Node.js como imagem base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Nest.js server
CMD ["npm", "run", "start:dev"]
