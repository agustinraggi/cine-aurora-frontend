# Cine Aurora

## Resumen del Proyecto

Cine Aurora es un sistema web diseñado para modernizar la experiencia de los clientes de un cine antiguo en Rosario. Utilizando la API de The MovieDB, el sistema permite a los usuarios acceder a la cartelera de películas, gestionar su perfil, comprar entradas y recibir ofertas especiales.

---

## Tabla de Contenidos

1. [Objetivo](#objetivo)
2. [Requerimientos del Sistema](#requerimientos-del-sistema)
   - [Registro de Usuarios](#registro-de-usuarios)
   - [Inicio de Sesión](#inicio-de-sesión)
   - [Cartelera de Películas](#cartelera-de-películas)
   - [Selección de Entradas](#selección-de-entradas)
   - [Proceso de Compra](#proceso-de-compra)
   - [Confirmación de Compra y Código Único](#confirmación-de-compra-y-código-único)
   - [Historial de Compras](#historial-de-compras)
   - [Ofertas y Promociones](#ofertas-y-promociones)
3. [Funcionalidades Técnicas Adicionales](#funcionalidades-técnicas-adicionales)
   - [Control de Roles](#control-de-roles)
   - [Sistema de Notificaciones](#sistema-de-notificaciones)
   - [Seguridad](#seguridad)
4. [Instrucciones de Instalación](#instrucciones-de-instalación)
5. [Integrantes del Grupo](#integrantes-del-grupo)

---

## Objetivo

Desarrollar un sistema web para "Cine Aurora" que compita con grandes cadenas de cine, ofreciendo una experiencia moderna y funcional a sus clientes.

---

## Requerimientos del Sistema

### Registro de Usuarios

- Los clientes deben registrarse para adquirir entradas.
- Datos requeridos:
  - DNI
  - Nombre
  - Apellido
  - Email
  - Fecha de nacimiento
- El email se usará para enviar ofertas especiales.

### Inicio de Sesión

- Los usuarios podrán identificarse mediante su DNI o correo electrónico.

### Cartelera de Películas

- Los usuarios podrán buscar películas disponibles en la cartelera.
- Se incluirá una sección de próximos estrenos.
- Información sobre formato (2D, 3D, etc.) y el idioma disponible.

### Selección de Entradas

- Los usuarios podrán seleccionar la cantidad de asientos y el área preferida en el cine.
- Un resumen con los detalles de la selección se mostrará antes de confirmar la compra.

### Proceso de Compra

- Al presionar el botón "Comprar", se mostrará el botón de Mercado Pago para completar la transacción.
- Las sillas no se reservarán hasta que el pago se complete exitosamente.

### Confirmación de Compra y Código Único

- Al finalizar la compra, el usuario será redirigido a su perfil con el historial de compras.
- Se generará un código único para validar la entrada en el cine.

### Historial de Compras

- Acceso al historial de entradas adquiridas desde el perfil del usuario, incluyendo el código de compra.

### Ofertas y Promociones

- Envío de ofertas exclusivas por correo electrónico, como descuentos o promociones.

---

## Funcionalidades Técnicas Adicionales

### Control de Roles

- Distinción entre usuarios normales y administradores.
- Los administradores gestionarán la cartelera y editarán películas.

### Sistema de Notificaciones

- Notificaciones automáticas por correo para confirmar compras y enviar promociones.

### Seguridad

- Protección de datos personales mediante JWT.
- Validación del código de entrada en el cine para evitar fraudes.

---

## Instrucciones de Instalación

Para iniciar la aplicación, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/agustinraggi/cine-aurora-frontend.git
   ```

2. Navega a la carpeta `client`:
   ```bash
   cd cine-aurora-frontend
   ```

3. Instala las librerías necesarias:
   ```bash
   npm install
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

### Nota para Compras

Se recomienda usar la aplicación en una ventana de incógnito para evitar salir de tu usuario de Mercado Pago:

- **Nombre de cuenta de Mercado Pago**: TESTUSER1006550785
- **Contraseña de usuario de Mercado Pago**: JR8xEFv8pg

### Link de muestra de la aplicación

Puedes ver una demostración de la aplicación en el siguiente enlace:
[Demo de Cine Aurora](https://drive.google.com/drive/folders/1KNipmQ1gqdZNKFnduNhWCk5B5zVscSgy?usp=drive_link)

---

## Integrantes del Grupo

1. Agustin Raggi, legajo 50786, comisión 302