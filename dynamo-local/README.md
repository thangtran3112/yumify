# Dynamo DB local with Docker

## Instructions

- [See official instructions here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

```zsh
    cd dynamo-local
    sudo usermod -aG docker $USER
    newgrp docker
    sudo chmod 777 -R *
    sudo docker compose up -d
    sudo chmod 777 -R *
    docker ps -a
    docker stop dynamodb-local
```

- Setup local aws credentials as

```properties
[default]
aws_access_key_id = fakeMyKeyId
aws_secret_access_key = fakeSecretAccessKey
region = us-east-1
```

- Testing connection to dynamo DB:

```zsh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

- Download and install [No SQL workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

```zsh
  chmod +x NoSQL_Workbench.AppImage
  ./NoSQL_Workbench.AppImage
```

## Single run dynamoDB

```yml
services:
  dynamodb-local:
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
```

## If you want your application and DynamoDB local to be in separate containers, use the following yaml file.

```yml
version: "3.8"
services:
  dynamodb-local:
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
  app-node:
    depends_on:
      - dynamodb-local
    image: amazon/aws-cli
    container_name: app-node
    ports:
      - "8080:8080"
    environment:
      AWS_ACCESS_KEY_ID: "DUMMYIDEXAMPLE"
      AWS_SECRET_ACCESS_KEY: "DUMMYEXAMPLEKEY"
    command: dynamodb describe-limits --endpoint-url http://dynamodb-local:8000 --region us-west-2
```

This docker-compose.yml script creates an app-node container and a dynamodb-local container. The script runs a command in the app-node container that uses the AWS CLI to connect to the dynamodb-local container and describes the account and table limits.

## To use with your own application image, replace the image value in the example below with that of your application.

```yml
version: "3.8"
services:
  dynamodb-local:
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
  app-node:
    image: location-of-your-dynamodb-demo-app:latest
    container_name: app-node
    ports:
      - "8080:8080"
    depends_on:
      - "dynamodb-local"
    links:
      - "dynamodb-local"
    environment:
      AWS_ACCESS_KEY_ID: "DUMMYIDEXAMPLE"
      AWS_SECRET_ACCESS_KEY: "DUMMYEXAMPLEKEY"
      REGION: "eu-west-1"
```
