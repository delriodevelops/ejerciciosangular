# SEARCH ON TYPE: Iniciar el proyecto

Para iniciar el ejercicio, hay que levantar el servidor con la base de datos con el comando **`npm start`** y abrir el lado del cliente con **`ng serve -o`**.

## Objetivos

- Conectarse a una API con una base de datos que nos pueda proveer distintos datos sobre universidades de alrededor de todo el mundo.
- Crear un servicio que se conecte a la API con unas queries que se ajusten a las búsquedas del usuario, en este caso buscar por nombre de la universidad y país en la que esta situada la misma.
- Disparar el servicio cada vez que el usuario escriba(se dispara el evento input).
- Cuando se reciban los resultados que coinciden con la búsqueda mostrarlos debajo de la barra del buscador a modo de sugerencia.

## Peculiaridades y/o cosas a tener en cuenta

- La forma de hacer la request a la API es algo diferente en la url por la forma en la que JSON-SERVER diseña los endpoints. Ej: Para buscar por nombre, en el objeto habria una propiedad `name` y la query se haria **`endpoint/?name=query`** pero en este caso tras recibir varios errores e investigar, vi que la query se asemejaba mas a algo como SQL siendo la query **`endpoint/?name_like=query`**.
- Cuando no se encuentra ningun resultado, se ve representado con un list item que informa de que no se han encontrado resultados con el nombre indicado.
- Se puede elegir entre unversidades de todo el mundo, España, Reino Unido y Portugal. Cada vez que se cambia de país se limpia la barra de .
- La API se desplega en el puerto `3000` y el cliente en el `4200`.
