FROM node: 13.12.0-alpine
WORKDIR /
ENV PATH /node_modules

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm instal react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "start"]
