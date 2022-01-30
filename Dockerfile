ARG PORT=3000
FROM node:12.22-alpine AS node
RUN apk add dumb-init

# first build stage
FROM node AS buildstage1
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN yarn
COPY . .
RUN yarn build 
RUN rm -rf node_modules

# second build stage
FROM node AS buildstage2
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade
RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app 
WORKDIR /home/node/app
COPY package*.json ./
USER node

# install only production dependencies
RUN yarn install --production --frozen-lockfile
COPY --chown=node:node --from=buildstage1 /app/build ./build
EXPOSE ${PORT}

CMD ["dumb-init", "node", "build/index.js"]
