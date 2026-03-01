# Posts & Comments API

Backend desarrollado con NestJS y MongoDB para la gestión de publicaciones y comentarios.

## 🚀 Tecnologías

- NestJS
- MongoDB
- Mongoose
- TypeScript
- Class Validator
- Docker (pendiente / opcional)

---

## 📂 Estructura del Proyecto

src/
├── common/
│ ├── filters/
│ ├── responses/
│ ├── dto/
│ ├── utils/
│ └── interceptors/
├── posts/
├── comments/
└── main.ts


---

## ⚙️ Configuración

### 1️⃣ Clonar repositorio
```bash
git clone <repo-url>
cd posts-comments-api

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Variables de entorno
PORT=3000
MONGO_URI=mongodb://localhost:27017/posts-comments

4️⃣ Ejecutar aplicación
npm run start:dev

http://localhost:3000/api

POSTS

Crear Post
POST /api/posts

Body:
{
  "title": "Mi post",
  "content": "Contenido del post",
  "author": "Alexandra"
}

Obtener todos los posts
GET /api/posts

Obtener post por ID
GET /api/posts/:id

Actualizar post
PUT /api/posts/:id

Eliminar post
DELETE /api/posts/:id

Bulk Upload
POST /api/posts/bulk

Body
[
  {
    "title": "Post 1",
    "content": "Contenido 1",
    "author": "Autor 1"
  }
]

COMMENTS

Crear comentario
POST /api/comments

Body:
{
  "postId": "post_object_id",
  "name": "Alexandra",
  "email": "alexandra@email.com",
  "body": "Excelente post"
}

Obtener comentarios por post
GET /api/posts/:id/comments

Eliminar comentario
DELETE /api/comments/:id

