# Docker Guides

## Contents

- [Useful Docker commands](#useful-docker-commands)
- [Working with Dockefiles](#working-with-dockerfiles)
- [Docker Compose](#docker-compose)
- [Other Notes](#other-notes)

See [here](./Environments) for sample Docker environment setups.

## Useful Docker commands

#### List available docker images

```sh
docker images
```

#### Run docker container from public image

```sh
docker run -d nimmis/apache-php5
docker run -d --name="apache_server" nimmis/apache-php5
```

#### Execute bash within running docker container

```sh
docker exec -it apache_server bash
```

#### Delete a container by ID

```sh
docker rm -f <container>
```

> You may use first 5 characters for container ID in place of `<container>`

#### Run docker container from public image with port mapping

```sh
docker run -tid -p 80:80 --name apache_server nimmis/apache-php5
```

#### Remove docker image

```sh
docker rmi <image-name>
```

## Working with Dockerfiles

Sample Dockerfile

```Dockerfile
# Expose port
EXPOSE 80

# Specify base image
FROM nimmis/apache-php5

# Run command with multiple parameters
CMD ["executable","param1","param2"] - 

# Copy file from current folder to folder within docker image
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf - 

# Run command as admin while building container
RUN apt-get update

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root
```

#### Within current folder, to build the docker image run:

```sh
docker build .
```

#### Build and tag image

```sh
docker build -t younesrafie/apache-php:v0.1 .
```

#### Push image to docker hub

```sh
docker push younesrafie/apache-php:v0.1
```

## Docker Compose

Sample `docker-compose.yml`

```yaml
server:
  image: younesrafie/apache-php:v0.1
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - .:/var/www
  environment:
    - API_TOKEN=xxxx
```

**Parameters**

- `image` - Specify image to use
- `build` - Specify folder to build
- `ports` - Port mapping
- `volumes` - Volume mapping

#### Run docker-compose

```sh
docker-composer up -d server
```

> Add `—-build` tag to rebuild image

## Other Notes

#### Accessing host from within the docker containers

```
docker.for.mac.host.internal
```

#### Enable mod_rewrite on Apache on Ubuntu OS

```sh
a2enmod rewrite
```