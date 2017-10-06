FROM node:6.3.1
RUN apt-get update 
WORKDIR /usr/src/app/
COPY . /usr/src/app/
RUN npm install

CMD [ "npm", "start" ]