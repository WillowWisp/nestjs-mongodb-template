FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install --no-package-lock
CMD ["npm", "start"]