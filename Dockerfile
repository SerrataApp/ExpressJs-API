FROM node:19
WORKDIR /usr/src/app
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/mydb?schema=public"
ENV PORT=3000
ENV SECRET_KEY="0b076ce60658dcad4f0c1852d6a49f22cf9d0fa6d85088289f8a4c5bbb1d24bc"
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm install -g bun
RUN npm install @prisma/client
RUN npx prisma generate
CMD ["bun", "--hot", "src/app.ts"]
