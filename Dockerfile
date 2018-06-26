# Install node.js and npm
FROM node:9

# set the working directory
WORKDIR /usr/src/digitalwallet

#copy package.json & packge-lock.json
COPY package*.json ./

# run npm
RUN npm install

# Bundle app source
COPY . .

#app binds to 3000 port
EXPOSE 3000

#command to run
CMD [ "npm", "start" ]



