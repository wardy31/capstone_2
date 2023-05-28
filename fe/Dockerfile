FROM node:19.9-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@9.6.7
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf