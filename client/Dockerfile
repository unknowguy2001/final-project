# Stage 1: Build Stage
FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Stage 2: Production Stage
FROM node:16-alpine
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Install serve globally
RUN npm i -g serve@latest

# Create a non-root user
RUN adduser -D appuser
USER appuser

ENV PORT=5173
EXPOSE $PORT

# Command to run the application
CMD ["serve", "-s", "./dist", "-p", "5173"]