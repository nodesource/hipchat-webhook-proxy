FROM nodesource/nsolid:carbon-latest

WORKDIR /usr/src/hipchat-webhook-proxy

RUN npm config set package-lock false
COPY package.json ./
RUN npm install

COPY . .

CMD ["nsolid", "index.js"]
