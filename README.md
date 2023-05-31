# Administrador de Nómina

Este es un proyecto de administración de nómina que te permite gestionar y calcular los salarios de los empleados de una empresa. el sistema es capaz de realizar cálculos automáticos, generar reportes y almacenar la información de manera segura.

## Características

#### Administrador:

Crear empleado: El administrador puede crear nuevos empleados y proporcionarles acceso a la plataforma de administración de nómina.

Dar de alta empleado: El administrador puede dar de alta a los empleados en la plataforma, ingresando su información personal y laboral.

Agregar deducibles: El administrador puede agregar deducibles, como impuestos o préstamos, para que sean descontados automáticamente de los salarios de los empleados en la generación de las nóminas.

Crear cargos: El administrador puede crear nuevos cargos en la empresa y asignarlos a los empleados según corresponda.

Generar nómina por empleado: El administrador puede generar las nóminas de los empleados, calculando automáticamente los salarios teniendo en cuenta las horas trabajadas, deducciones y otros factores relevantes.

#### Empleado:

Modificar datos personales: El empleado puede modificar su información personal, como dirección, número de teléfono, etc.

Registrar entrada y salida: El empleado puede marcar su entrada y salida en la plataforma para registrar las horas trabajadas y facilitar el cálculo de su salario.

Consultar nómina por mes: El empleado puede consultar su nómina generada para un mes específico, visualizando los detalles de su salario, deducciones, etc.

## Herramientas utilizadas

Lenguaje de programación: El proyecto está desarrollado en JavaScript (JS), un lenguaje de programación ampliamente utilizado en el desarrollo web.

#### Front-end:

jQuery: Se utilizó la librería jQuery para facilitar las peticiones AJAX y la manipulación del DOM. jQuery simplifica la interacción con el servidor y agiliza el desarrollo de funciones interactivas en el front-end.

CSS: Se utilizó CSS (Cascading Style Sheets) para dar estilo y diseño a las páginas web del proyecto.

Bootstrap: Se utilizó la librería Bootstrap, que es un conjunto de herramientas de código abierto para desarrollar interfaces de usuario responsivas y atractivas. Bootstrap proporciona estilos predefinidos y componentes reutilizables que ayudan a acelerar el desarrollo del front-end.

HTML: El proyecto utiliza HTML (HyperText Markup Language) para estructurar y presentar el contenido de las páginas web.

#### Back-end:

Node.js: El proyecto utiliza Node.js, un entorno de ejecución de JavaScript del lado del servidor. Node.js permite la construcción de aplicaciones escalables y de alta performance.

Express: Se utilizó Express, un framework de Node.js, para facilitar el desarrollo de la aplicación en el lado del servidor. Express proporciona herramientas y funcionalidades que simplifican la creación de rutas, manejo de peticiones y respuestas HTTP, entre otras tareas comunes.

Nodemon: Se utilizó Nodemon para reiniciar automáticamente el servidor cuando se detectan cambios en los archivos. Esto agiliza el proceso de desarrollo, ya que no es necesario reiniciar el servidor manualmente después de cada modificación.

Body-parser: Se utilizó Body-parser para analizar los datos enviados en las solicitudes HTTP y convertirlos en objetos JavaScript utilizables. Esto facilita la lectura y manipulación de los datos recibidos en el servidor.

Mongoose: Se utilizó Mongoose, una biblioteca de modelado de objetos de MongoDB para Node.js, que proporciona una interfaz sencilla y basada en esquemas para interactuar con la base de datos MongoDB.

#### Base de datos:

MongoDB: Se utilizó MongoDB como sistema de gestión de bases de datos. MongoDB es una base de datos NoSQL orientada a documentos, lo que significa que almacena los datos en formato JSON-like (BSON). Es escalable, flexible y ofrece un rendimiento eficiente para aplicaciones web.
Herramientas de control de versiones: El proyecto hace uso de Git como sistema de control de versiones para gestionar y controlar los cambios en el código fuente.

Hospedaje: El código fuente del proyecto se encuentra alojado en GitHub, que es una plataforma de alojamiento y colaboración de código fuente.

## Instalación

#### Clona este repositorio en tu máquina local utilizando el siguiente comando:

git clone https://github.com/m0ntbl4ck/administrador-nomina.git

#### Accede al directorio del proyecto:

cd administrador-nomina

#### Instala las dependencias del proyecto:

npm install

## Uso

#### Accede a la carpeta del servidor:

cd servidor

#### Inicia la aplicación ejecutando el siguiente comando:

npx nodemon index.js

#### Abre tu navegador web y accede a la siguiente URL:

http://localhost:3000

Interactúa con la interfaz de usuario para agregar, editar y eliminar empleados, así como para generar reportes de nómina.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes obtener más información en el archivo LICENSE.

## Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, puedes contactarme a través de mi dirección de correo electrónico mont.black.123@gmail.com o visitar mi perfil de GitHub m0ntbl4ck.

##### Proyecto desarrollado y creado por natalyq1, SolartianDev y m0ntbl4ck.
