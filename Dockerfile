FROM node:lts
WORKDIR /app
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["npm", "start"]
