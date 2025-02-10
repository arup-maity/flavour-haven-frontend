# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
