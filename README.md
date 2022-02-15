# PROJECT 2

> A safe platform to visualise and share experiences of sexual abuse and assault cases
>



## Main Points: 


 ///////
 
 

## Express endpoint table

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/`             	| Landing   	| |
| GET         	| `/mapa` 	            | Map	| |
| GET         	| `/registro` 	| Register Form Render	| |
| POST         	| `/registro` 	| Register Form Post	| |
| GET         	| `/iniciar-sesion` 	| Sing-in	| |
| POST        	| `/usuario/inicio-sesion` 	| Sing-in 	| |
| POST       	| `/usuario/cerrar-sesion`         	| Log-out        	| |
| GET         	| `/usuario/:id`             	| User profile   	| |
| POST         	| `/usuario/:id/editar`         | User edit form POST       	| |
| GET         	| `/mapa`             	| New case    	| |
| POST         	| `/usuario/:id/crear-caso`     	| New case    	| |
| GET      	| `/usuario/:id/:casoId`     	| Case details  | |
| GET      	| `/usuario/:id/:casoId/editar`     	| Case edit | |
| POST      	| `/usuario/:id/:casoId/editar`     	| Case edit POST | |
| POST      	| `/usuario/:id/:casoId/eliminar`     	| Case edit DELETE | |
| POST      	| `/usuario/:id/caso/reportar`     	| Case report | |
| POST      	| `/usuario/:id/caso/comentar`     	| Case comment | |
| POST      	| `/usuario/:id/caso/eliminar-comentario`     	| Case comment delete | |
| GET     	| `/eventos/`     	| Event list | |
| GET     	| `/evento/crear`     	| Event create | |
| POST    	| `/evento/crear`     	| Event create | |
| GET     	| `/evento/:id/editar`     	| Event edit| |
| POST  	| `/evento/:id/editar`     	| Event edit| |
| POST  	| `/evento/:id/borrar`     	| Event delete| |
| POST  	| `/evento/:id/unirse`     	| Event join| |
| POST  	| `/evento/:id/des-unirse`     	| Event un-join| |
| GET	| `/api/cases`     	| Cases API| |
























