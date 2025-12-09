# Express App con EJS y PostgreSQL

Aplicación web desarrollada con Node.js, Express.js, EJS y PostgreSQL.

## Características

- 🚀 Express.js como framework web
- 📝 EJS como motor de plantillas
- 🐘 PostgreSQL como base de datos
- 🎨 Diseño moderno y responsivo
- ✨ CRUD completo de usuarios

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Instalación

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```

4. **Crear la base de datos:**

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE express_db;

# Salir de psql
\q
```

5. **Ejecutar el script SQL:**

```bash
psql -U postgres -d express_db -f database/schema.sql
```

## Uso

### Modo Desarrollo

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
webIIInodejs/
├── config/
│   └── database.js       # Configuración de PostgreSQL
├── controllers/
│   └── userController.js # Lógica de negocio
├── database/
│   └── schema.sql        # Script de base de datos
├── public/
│   └── css/
│       └── style.css     # Estilos CSS
├── routes/
│   ├── index.js          # Rutas principales
│   └── users.js          # Rutas de usuarios
├── views/
│   ├── users/
│   │   ├── index.ejs     # Lista de usuarios
│   │   └── form.ejs      # Formulario crear/editar
│   ├── error.ejs         # Página de error
│   └── index.ejs         # Página de inicio
├── .env.example          # Plantilla de variables de entorno
├── .gitignore
├── app.js                # Configuración de Express
├── package.json
└── server.js             # Punto de entrada
```

## Endpoints

- `GET /` - Página de inicio
- `GET /users` - Lista de usuarios
- `GET /users/new` - Formulario crear usuario
- `POST /users` - Crear usuario
- `GET /users/:id/edit` - Formulario editar usuario
- `POST /users/:id` - Actualizar usuario
- `POST /users/:id/delete` - Eliminar usuario

## Tecnologías

- **Backend:** Node.js, Express.js
- **Base de Datos:** PostgreSQL
- **Template Engine:** EJS
- **Estilos:** CSS3 (Vanilla)

## Licencia

ISC
