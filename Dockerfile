FROM node

# Set Working Directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy Source
COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Build
RUN npm install
RUN npm run build

# Setup Server
RUN npm install -g serve
EXPOSE 5000

# start app
CMD ["serve", "-s", "build"]
