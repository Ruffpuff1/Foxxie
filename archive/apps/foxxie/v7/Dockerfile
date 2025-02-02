FROM node:22@sha256:ae2f3d4cc65d251352eca01ba668824f651a2ee4d2a37e2efb22649521a483fd

WORKDIR /

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json tsconfig.json
COPY ../../.git/ ../../.git/

RUN yarn install

COPY scripts/ scripts/
COPY src/ src/

RUN yarn build

ENV NODE_ENV="production"

COPY .env .env

CMD [ "yarn", "start" ]
