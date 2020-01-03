#? BASE IMAGE
FROM node:10.18.0

#? EXPOSING NEEDED PORTS
EXPOSE 5432 4321 35729
RUN   npm i -g gulp@4.0.2 yo@3.1.1 @microsoft/generator-sharepoint@1.9.1 --unsafe-perm

#? CREATE WORKING DIR
RUN mkdir /usr/src/app

#? INSTALL AND CACHE APP DEPENDENCIES
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install

#? ADD `/usr/src/app/node_modules/.bin` TO $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

#? START APP
CMD ["gulp", "trust-dev-cert", "gulp", "serve"]
