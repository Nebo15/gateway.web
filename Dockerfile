FROM nebo15/alpine-node:6.9.5

EXPOSE 8080

ENV NODE_ENV production

WORKDIR /annon.web

COPY . ./

RUN npm install --production
RUN npm run build

RUN rm -rf ./app/client \
	rm -rf ./app/common \
	rm -rf ./node_modules/webpack

CMD ["pm2-docker", "pm2.process.yml"]
