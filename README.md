# Pokedex Api - Nestjs

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="160" alt="Nest Logo" />
</div>

## Requisitos Previos

> [Nodejs 18.15.0](https://nodejs.org/download/release/v18.15.0/)

> [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

> [Nest Cli](https://docs.nestjs.com/cli/overview/)

> [Postman](https://www.postman.com/downloads/)

> [Docker Desktop](https://www.docker.com/products/docker-desktop/)

> [MongoDB Compass](https://www.mongodb.com/es/products/compass/)

## Ejecutar en Desarrollo

### Paso 1: Clonar el repositorio

Ingresamos a <https://github.com/Gilgammesh/nestjs-pokedex-api>

### Paso 2: Instalar Nest Cli de forma global

```sh
npm install @nestjs/cli -g
```

### Paso 3: Instalar las dependencias

```sh
yarn install
```

### Paso 4: Levantar la base de datos

Tener `Docker Desktop` abierto y ejecutar

```sh
docker-compose -f .\docker-compose.yaml up --build -d
```

### Paso 5: Clonar plantilla de variables de entorno

Copiar el archivo `.env.template` y renombrar la copia a `.env`

### Paso 6: Llenar las variables de entorno

Ingresar los valores de las variables de entorno definidas en el archivo `.env`

### Paso 7: Poblar la base de datos con la semilla

Ejecutar la petición del tipo `GET`

<http://localhost:4000/api/seed>

### Paso 8: Ejecutar la aplicación

En desarrollo

```sh
yarn start:dev
```
