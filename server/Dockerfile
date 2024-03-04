FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# ENV API_KEY=my_api_key
EXPOSE 5088
CMD ["npm", "start"]