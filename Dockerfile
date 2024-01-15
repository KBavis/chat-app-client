# Use a base image with Node.js installed
FROM node:14-alpine

# Copy package.json and package-lock.json (if present) to the working directory
COPY package.json .
COPY package-lock.json* .

# Install npm dependencies
RUN npm install

# Copy the entire React app code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your React app runs on
EXPOSE 3000

# Define the command to run your React app (serve the production build)
CMD ["npm", "start"]