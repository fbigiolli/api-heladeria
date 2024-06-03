# REST API Via-Apilia

## Overview
Este repositorio contiene la especificacion e implementacion de una API REST para una heladeria. Permite listar gustos, hacer pedidos, tener repartidores que se pueden asociar a los pedidos, y tener registrados los vehiculos correspondientes a cada repartidor. Actualmente tiene un [deploy hecho en railway](https://via-apilia.up.railway.app/docs/) donde se pueden usar todos los endpoints. 

### Server
Se puede correr un servidor localmente usando:

```
npm start
```

### Documentacion
 Para ver cada operacion en detalle, se puede acceder al  [deploy hecho en railway](https://via-apilia.up.railway.app/docs/).

 O en caso de estar usando el servidor local:


```
http://localhost:8080/docs
```

>[!NOTE]
>Todavia no están implementados los links en los response body.

## Tests
**WIP**. Cada endpoint cuenta con una Test Suite que prueba todos los verbos. Se pueden correr usando:
```
npm test
```
Para testear se usa el framework Jest.

## Stack
La API está especificada en **OAS 3.0**. Generé el server stub en **Node.JS** a partir de esa especificación usando **Swagger Codegen**. Para la base de datos uso **Atlas** (**MongoDB Cloud**). Para testing uso **Jest**.

## TODO
- [ ] Mejorar tests
- [ ] DELETE en /repartidores/{repartidorID}/vehiculos/{vehiculoID}
