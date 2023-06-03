# Stage 1: Build the application
FROM node:18-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Remove any unnecessary build artifacts or development files here

# Copy only necessary filesgt 
COPY . .

# Stage 2: Create the production container
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN mkdir -p "/usr/src/app"

EXPOSE 80

CMD [ "node", "./bin/www" ]
