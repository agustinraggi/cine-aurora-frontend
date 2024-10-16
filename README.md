Para poder utilizar la web que desarrollamos utilizando la API TMBD.
https://www.themoviedb.org/?language=es

para inicicar la app poner: 
1) "git clone https://github.com/agustinraggi/cine-aurora-frontend.git"
3) movernos a la carpeta client: "cd cine-aurora-frontend" 
4) instalar las librerias que vamos a usar: "npm install"
5) iniciar la aplicacion: "npm start" 

cuando ralizamos una compra se recomienda usar la aplicacion en ventana incognito para no salir de tu usario de mercado pago:
1) nombre de cuenta de mercado pago: TESTUSER1006550785
2) contraseña a usuario de mercado pago: JR8xEFv8pg



usar jest 
https://www.netlify.com/

Cine Aurora
Resumen:

El proyecto que planeamos hacer es una cartelera de un cine donde utilizaremos la api de The MovieDB API que nos ayudará a traer todos los datos necesarios sobre las peliculas que esten disponibles y en caso que el cliente desee podrá ver trailers tanto de peliculas viejas como las que esten proximas a salir.

Minuta de Proyecto: Sistema de Modernización para "Cine Aurora"

Objetivo: Desarrollar un sistema web para "Cine Aurora", un cine antiguo de la ciudad de Rosario, con el fin de competir con las grandes cadenas de cine y modernizar sus servicios. El sistema permitirá a los clientes acceder a la cartelera de películas, gestionar su perfil como usuario del cine, comprar entradas, y recibir ofertas especiales.

Requerimientos del Sistema:

        Registro de Usuarios:

Los clientes deben registrarse antes de poder adquirir entradas.
Los datos solicitados para el registro incluyen:
.DNI
.Nombre
.Apellido
.Email
.Fecha de nacimiento
.El email será utilizado para enviar ofertas especiales del cine (ej. 2x1 en entradas).
Inicio de Sesión:
Los usuarios podrán identificarse mediante su DNI o correo electrónico.

        Cartelera de Películas:

Los usuarios podrán buscar películas disponibles en la cartelera.
Se ofrecerá una sección de próximos estrenos.
Las películas incluirán información sobre formato (2D, 3D, etc.) y el idioma disponible.

        Selección de Entradas:

Los usuarios podrán seleccionar la cantidad de asientos deseados y el área de preferencia en el cine.
Antes de confirmar la compra, se mostrará un resumen con los detalles de la selección.

        Proceso de Compra:

Una vez satisfecho con la selección, el usuario presionará el botón de "Comprar".
Aparecerá el botón de Mercado Pago para completar la transacción.
Las sillas no quedarán reservadas hasta que el pago se haya completado exitosamente.

        Confirmación de Compra y Código Único:

Al finalizar la compra, el usuario será redirigido a su perfil, donde podrá ver su historial de compras.
Se generará un código único asociado a la compra.
Este código será presentado a los empleados del cine, quienes validarán la entrada. El código será marcado como utilizado para evitar usos repetidos.

        Historial de Compras:

En el perfil del usuario, se podrá acceder al historial de entradas adquiridas.
El código de compra será visible junto con los detalles de cada transacción.

        Ofertas y Promociones:

A través del correo electrónico, los usuarios recibirán ofertas exclusivas, como descuentos o promociones (ej. 2x1 en entradas).


                Funcionalidades Técnicas Adicionales:

        Control de roles:

Distinción entre usuarios normales y administradores del sistema.
Los administradores podrán gestionar la cartelera, editar películas disponibles, y ver reportes de ventas.

        Sistema de notificaciones:

Notificaciones automáticas por correo para confirmar compras o enviar promociones.

        Seguridad:

Manejo de datos personales con protección adecuada (JWT).
Validación del código de entrada en el cine para evitar fraudes.




integrantes del grupo:
1) Agustin Raggi, legajo 50786, comision 302
