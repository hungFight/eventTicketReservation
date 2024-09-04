# Stage 1: Build the application
FROM node:20.10.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if available)
COPY package*.json ./

# Install dependencies
RUN yarn install --network-timeout 10000000

# Copy the rest of the application code
COPY . .
RUN npx prisma generate dev
# Build the application
RUN yarn run build

# Command to run the application
CMD ["node", "dist/main.js"]
