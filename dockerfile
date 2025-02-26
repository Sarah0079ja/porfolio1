# Use the official Node.js 16 image
FROM node:16

# Set the working directory
WORKDIR /Users/sarahodiavbara/Desktop/porfolio1

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]