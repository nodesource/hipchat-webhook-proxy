FROM nodesource/nsolid:carbon-latest

WORKDIR /usr/src/hipchat-webhook-proxy

ADD . /usr/src/hipchat-webhook-proxy

# Work around for the broken -g flag in npm
RUN npm install npm@5
RUN rm -rf /lib/node_modules/npm
RUN mv node_modules/npm /lib/node_modules/npm

RUN npm install

CMD ["nsolid", "index.js"]
