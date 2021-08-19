# PI-HASSPARADISE

> Proyecto integrador desarrollado con el stack MERN para la empresa HassParadise
> **Nota:** Esta no es la versión final, ya que por privacidad a la empresa se mantiene la versión final en otro repositorio, por lo que si hay algún error ya se debió solucionar en la versión final


## Desarrollo
El desarrollo se hizo en el frontend con reactjs y material UI para una interfaz mas amigable, el backend esta desarrollado en NodeJS haciendo uso de express y mongoDB como base de datos, además todas las rutas estan protegidas en el backend haciendo uso de JWT y un middleware que me verifica la veracidad del token para que solo los usuarios con acceso a estas rutas puedan interactuar con ellas


## Descripción de modulos
#### Login
> Se cuenta con un login, el cual hace uso de un jwt para autentificarse y mantener la seguridad en el backend
>![Vista del login](https://github.com/cardacar/PI-HASSPARADISE/blob/main/src/img/Login.png)

### Administración de usuarios
> Modulo donde se crea y administra los usuarios, el cual solo se puede ver si se tiene el rol de administrador
>![admin users](https://github.com/cardacar/PI-HASSPARADISE/blob/main/src/img/AdminPage.png)

### Módulos de Fertilización, Fumigación, Siembra e inventario
> En estos módulos se maneja un CRUD donde dependen del inventario para poder agregar los productos, además cuenta con un mapa para la filtración de lotes y hacer una busqueda mas especifica
> ![modules](https://github.com/cardacar/PI-HASSPARADISE/blob/main/src/img/adminUser.png)


### Precipitación
>En este modulo se hace uso la api de openweather para obtener los datos de la precipitacion en el cultivo, pero se gestiona los datos en el backend para una limpieaza de los datos traidos por la api de openweather
>![precipitacion](https://github.com/cardacar/PI-HASSPARADISE/blob/main/src/img/weather.png)


### Reportes
>En este modulo se gestiona los reportes de la empresa dependiendo de un rango de fechas, el lote y el modulo 
![report Page](https://github.com/cardacar/PI-HASSPARADISE/blob/main/src/img/reportPage.png)
