# GestionWorks (Frontend)

Frontend de **GestionWorks**, una aplicación web para la gestión de incidencias, solicitudes y órdenes de trabajo.

Este proyecto forma parte de una iniciativa personal orientada a aplicar **Angular moderno**, buenas prácticas de arquitectura, componentes reutilizables y una interfaz responsive utilizando **Tailwind CSS** y **DaisyUI**.

> 🚧 **Estado del Proyecto:** Work In Progress (WIP).
> Actualmente me encuentro desarrollando el módulo de autenticación y la lógica de negocio para la gestión de tickets.

---

# 🛠️ Stack Tecnológico

## Frontend

- Angular 21
- TypeScript
- Angular Router
- HttpClient
- Angular Signals
- RxJS
- rxResource

## UI

- Tailwind CSS v4
- DaisyUI
- Responsive Design
- Mobile First

## Arquitectura

- Standalone Components
- Feature-based Architecture
- Layout-based Routing
- Component Composition
- Smart & Presentational Components
- Reusable UI Components

---

# ✨ Características

- Landing Page pública
- Sistema de autenticación
- Gestión de sesión del usuario
- Layouts públicos y privados
- Navbar responsive
- Componentes reutilizables
- Navegación modular mediante Angular Router
- Gestión de tickets
- Tema oscuro

---

# 🏗️ Arquitectura

El proyecto sigue una **Feature-based Architecture**, separando la aplicación por funcionalidades y responsabilidades para facilitar su escalabilidad y mantenimiento.

```text
src/
└── app/
    ├── features/
    │   ├── auth/
    │   ├── home/
    │   └── tickets/
    │       ├── components/
    │       ├── models/
    │       ├── pages/
    │       ├── services/
    │       └── tickets.routes.ts
    │
    ├── layouts/
    │   ├── app-layout/
    │   ├── auth-layout/
    │   └── public-layout/
    │
    ├── shared/
    │   └── components/
    │       ├── footer/
    │       └── theme-toggle/
    │
    ├── app.config.ts
    ├── app.routes.ts
    └── app.ts
```

La estructura del proyecto busca mantener una clara separación entre:

- **Features:** módulos funcionales de la aplicación (Auth, Tickets, Home, etc.).
- **Layouts:** estructura visual según el contexto (público, autenticación o aplicación).
- **Shared:** componentes reutilizables compartidos por toda la aplicación.
- **Components:** composición de interfaces mediante componentes pequeños y reutilizables.

---

# 📐 Principios del proyecto

Durante el desarrollo se busca aplicar las siguientes buenas prácticas:

- Componentes pequeños y reutilizables.
- Separación de responsabilidades.
- Arquitectura escalable.
- UI desacoplada de la lógica de negocio.
- Estado reactivo mediante Angular Signals.
- Código tipado utilizando TypeScript.
- Diseño responsive desde el inicio.
- Composición de componentes sobre herencia.
- Estructura modular basada en funcionalidades.

---

# 🚀 Objetivo

El objetivo principal de este proyecto es desarrollar una aplicación frontend moderna aplicando buenas prácticas de Angular, una arquitectura escalable y una experiencia de usuario intuitiva, preparada para integrarse con una API REST desarrollada en NestJS.

Además, este proyecto funciona como un espacio de aprendizaje y experimentación donde aplico nuevas características del ecosistema Angular y mejores prácticas de desarrollo frontend.

---

# 🚧 En desarrollo

Actualmente se está trabajando en:

- Sistema completo de autenticación.
- CRUD de Tickets.
- Dashboard de usuario.
- Perfil de usuario.
- Gestión de estados.
- Mejoras de experiencia de usuario (UX/UI).

---

# ▶️ Ejecutar en desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/alexisg78/GestionWorks_Frontend.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

Crear el archivo:

```text
src/environments/environment.ts
```

Ejemplo:

```ts
export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/api',
};
```

### 4. Ejecutar la aplicación

```bash
npm start
```

o

```bash
ng serve
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

# 🔗 Backend

Este proyecto consume la API desarrollada en el siguiente repositorio:

👉 **Backend (API):** [GestionWorks_API](https://github.com/alexisg78/GestionWorks_Backend.git)

---

# 🗺️ Roadmap

- [x] Arquitectura base
- [x] Layouts públicos y privados
- [x] Navbar responsive
- [x] Sistema de autenticación
- [ ] CRUD completo de Tickets
- [ ] Dashboard
- [ ] Perfil de usuario
- [ ] Notificaciones
- [ ] Tests

---

# 📄 Licencia

Proyecto desarrollado con fines educativos, de aprendizaje y como parte de mi portfolio personal de desarrollo Full Stack.
