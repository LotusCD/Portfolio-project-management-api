# Use the official Node.js image.
FROM node:16

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .


# Set environment variables.
ENV PORT=3001

# Expose the port the app runs on.
EXPOSE 3001

# Run the web service on container startup.
CMD ["node", "server.js"]
