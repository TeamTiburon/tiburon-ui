FROM node

# Set Working Directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy Source
COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY data /usr/src/app/data
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Build
RUN npm install
RUN npm run build

# Setup Server
EXPOSE 8080

# start app
CMD ["npm", "run", "serve", "-l", "8080"]
