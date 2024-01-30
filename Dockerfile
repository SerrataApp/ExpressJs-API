FROM node:19
WORKDIR /usr/src/app
ENV PORT=3000
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
# RUN rm -rf node_modules
# RUN rm -rf src
EXPOSE 3000
CMD [ "/bin/bash", "-c", "npx prisma migrate dev; npm run prod" ]

