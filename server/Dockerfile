FROM node:16-alpine

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

# Install npm dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Install PM2 globally with a specific version
RUN npm i pm2@latest -g

# Switch to non-root user
USER nodejs

CMD ["pm2-runtime", "start", "server.js"]

EXPOSE 3000