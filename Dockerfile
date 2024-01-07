FROM node:19
WORKDIR /usr/src/app
ENV PORT=3000
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate
# RUN rm -rf node_modules
# RUN rm -rf src
EXPOSE 3000
CMD [ "npx" "prisma" "generate" && "npm", "run", "prod" ]

