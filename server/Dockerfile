FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD [ "node", "./src/server.js" ]

# docker login -u stardusteightt (with DockerHub account)
# In this directory -> docker build . -t stardusteightt/armazem-server (<usernameInDockerHub>/<ImageRepository>)
# docker images
# docker run -d -p 8080:5000 stardusteightt/armazem-server:latest
# or docker run -p 5000:5000 stardusteightt/armazem-server:latest (if EXPOSE = 5000)
# http://localhost:5000/api/auth/allUsers/6340ba7c11f8c41c57a5f4b8

# docker ps (list processes)
# docker kill <container id> (shut down the image)
# docker stop $(docker container ls -q) (stop all processes)

## Deploy
# docker push stardusteightt/armazem-server:latest