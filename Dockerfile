FROM node:19
WORKDIR /usr/src/app
ENV PORT=3000
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npx prisma generate
RUN npm install -g bun
CMD ["bun", "--hot", "src/app.ts"]

