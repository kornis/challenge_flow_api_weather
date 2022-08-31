
# Challenge Weather para Flow-Telecom

API que consulta el clima y la locación actual del usuario.



## Ejecutar de forma local

Clone the project

```bash
  git clone https://github.com/kornis/challenge_flow_api_weather
```

Go to the project directory

```bash
  cd challenge_flow_api_weather
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

#### Ubicación actual

```http
  GET /v1/location
```


#### Clima actual

```http
  GET /v1/current/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | **Optional**. Ciudad para obtener el clima |

#### Pronóstico de 5 días
```http
  GET /v1/forecast/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | **Optional**. Ciudad para obtener el pronóstico del clima |

#### Documentación de Swagger
```http
  GET /v1/api-docs
```

## Running Tests

Para correr los test se puede ejecutar el siguiente código

```bash
  npm run test
```


## FAQ

#### ¿Hace falta configurar variables de entorno?

Si bien no es una buena práctica, al ser un challenge, el archivo .env está subido al proyecto con las variables de entorno ya configuradas

#### ¿Cómo se obtiene la posición actual del usuario?

La posición actual del usuario se obtiene mediante la ip de la consulta y esta se utiliza con una api externa que devuelve las coordenadas del usuario. Si la aplicación corre en local no se puede obtener la IP, con lo cual, enviamos información de una ip estatica harcodeada en el código.



## Authors

- Federico Garcia - [@kornis](https://github.com/kornis)

