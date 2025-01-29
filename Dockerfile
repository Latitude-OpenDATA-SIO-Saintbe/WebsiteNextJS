FROM node:20-alpine

# Install necessary dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./package.json ./package-lock.json ./

# Install dependencies (including Next.js)
RUN npm install

# Copy all files into the container
COPY ./ ./

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
