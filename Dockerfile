FROM node:19
WORKDIR /usr/src/app
ENV PORT=3000
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm install -g bun
RUN npm install @prisma/client
RUN npx prisma generate
CMD ["bun", "--hot", "src/app.ts"]

