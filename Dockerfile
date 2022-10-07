FROM node:latest
 
WORKDIR /usr/src/app 
 
COPY package*.json ./ 
 
RUN npm install

COPY . . 
 
EXPOSE 3006

RUN npm run build 
 
ENTRYPOINT [ "npm", "run", "dev" ]