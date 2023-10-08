FROM node:16-alpine as builder

# chaging the working directory
WORKDIR /app
# copying package & yarn files and installing dependecies
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build
#
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
