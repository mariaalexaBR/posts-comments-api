# 📌 Posts & Comments API

API REST desarrollada con **NestJS + MongoDB**, que permite la gestión de Posts y Comments con:

- ✅ Paginación real
- ✅ Validaciones con DTOs
- ✅ Global Exception Filter
- ✅ Global Response Interceptor
- ✅ Autenticación JWT simple
- ✅ Docker + Hot Reload
- ✅ Colección Postman incluida

---

## 🚀 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/mariaalexaBR/posts-comments-api.git
cd posts-comments-api
```

---

## 🐳 2️⃣ Levantar el proyecto con Docker

Este proyecto utiliza **Docker + Docker Compose** para levantar:

- MongoDB
- Backend NestJS

Ejecutar:

```bash
docker-compose up --build
```

La API quedará disponible en:

```
http://localhost:3000
```

MongoDB se ejecuta en:

```
mongodb://localhost:27017
```

### 🔄 Hot Reload habilitado

El proyecto está configurado para desarrollo con:

```bash
npm run start:dev
```

Cualquier cambio en el código reinicia automáticamente el backend dentro del contenedor.

---

## 🔐 3️⃣ Autenticación JWT

Para acceder a rutas protegidas (crear, actualizar o eliminar posts):

```
POST http://localhost:3000/api/auth/login
```

**Body:**

```json
{
  "username": "admin",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "access_token": "JWT_TOKEN"
}
```

**En Postman:**

1. Ir a **Authorization**
2. Tipo: **Bearer Token**
3. Pegar el token

---

## 📬 4️⃣ Endpoints principales

### Posts

| Método | Endpoint      | Protección |
|--------|---------------|------------|
| GET    | /posts        | Público    |
| GET    | /posts/:id    | Público    |
| POST   | /posts        | 🔒 JWT     |
| POST   | /posts/bulk   | 🔒 JWT     |
| PUT    | /posts/:id    | 🔒 JWT     |
| DELETE | /posts/:id    | 🔒 JWT     |

### 💬 Comments

| Método | Endpoint               | Protección |
|--------|------------------------|------------|
| GET    | /comments/post/:postId | Público    |
| POST   | /comments              | 🔒 JWT     |
| DELETE | /comments/:id          | 🔒 JWT     |

---

## 📑 5️⃣ Paginación

Los endpoints GET soportan:

```
?page=1&limit=10
```

**Ejemplo:**

```
GET http://localhost:3000/api/posts?page=1&limit=2
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Request successful",
  "data": {
    "items": [...],
    "meta": {
      "total": 2,
      "page": 1,
      "limit": 2,
      "totalPages": 1
    }
  }
}
```

---

## 📦 6️⃣ Carga masiva de datos

Se incluye un archivo de ejemplo:

```
data/posts-bulk.json
```

Para carga masiva:

```
POST http://localhost:3000/api/posts/bulk
```

**Body:**

```json
[
  {
    "title": "Post 1",
    "body": "Contenido del post uno para carga masiva.",
    "author": "User 1"
  },
  {
    "title": "Post 2",
    "body": "Contenido del post dos para carga masiva.",
    "author": "User 2"
  }
]
```

---

## 📮 7️⃣ Colección Postman incluida

Se incluye:

```
postman/Posts-Comments-API.postman_collection.json
```

Para usarla:

1. Abrir **Postman**
2. **Import** → Seleccionar archivo
3. Ejecutar requests

---

## 🧱 8️⃣ Arquitectura

```
src/
 ├── auth/
 ├── posts/
 ├── comments/
 └── common/
     ├── filters/
     ├── interceptors/
     └── dto/
```

---

## 🛠 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport JWT](https://www.passportjs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🏁 9️⃣ Detener el proyecto

```bash
docker-compose down
```
