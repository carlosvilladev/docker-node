# Creating Images

#### node-auth
```sh
$ cd microservices/auth
$ docker build -t kardotjs/node-auth .
```

# Creating Containers

#### node-auth
```sh
$ docker run -p 3000:3000 --name node-auth kardotjs/node-auth
```