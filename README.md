# Pokedex Api - Nestjs

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="160" alt="Nest Logo" />
</div>

---

## Requisitos Previos

---

<br />

> [Nodejs 18.15.0](https://nodejs.org/download/release/v18.15.0/)

> [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

> [Nest Cli](https://docs.nestjs.com/cli/overview/)

> [Postman](https://www.postman.com/downloads/)

> [Docker Desktop](https://www.docker.com/products/docker-desktop/)

> [MongoDB Compass](https://www.mongodb.com/es/products/compass/)

<br />

---

## Ejecutar en Desarrollo

---

<br />

### Paso 1: Clonar el repositorio

<br />

Ingresamos a <https://github.com/Gilgammesh/nestjs-pokedex-api>

<br />

### Paso 2: Instalar Nest Cli de forma global

<br />

```sh
npm install @nestjs/cli -g
```

<br />

### Paso 3: Instalar las dependencias

<br />

```sh
yarn install
```

<br />

### Paso 4: Levantar la base de datos

<br />

Tener `Docker Desktop` abierto y ejecutar

```sh
docker-compose -f .\docker-compose.yaml up --build -d
```

<br />

### Paso 5: Poblar la base de datos con la semilla

<br />

Ejecutar la petición del tipo `GET`

<http://localhost:4000/api/seed>

<br />
