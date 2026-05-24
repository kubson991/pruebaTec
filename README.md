# Prueba Técnica - Vue 3 + Pinia

Proyecto desarrollado con Vue 3, TypeScript, Pinia y Vite como parte de una prueba técnica.

Incluye gestión de órdenes de pago, filtros dinámicos, paginación y estados con reglas de negocio.

Se implemento un sistema de diseño propio mediante SCSS asi que no se usaron librerias de estilo adicionales

Usa Ctrl + h para volver al home si estas en otra vista :)

La implementación de plinia se baso en 2 propositos ,manejo de estados globales (como loaders) y patron de consumo de API mediante stores con las ventajas que estoy conlleva (por ejemplo data guardada en cache temporal)

Tambien en la raíz hay una carpeta con los pantallazos de la aplicacion web en varios tamaños y con modo oscuro.

Es importante aclarar que para que correcto funcionamiento de la app debe estar corriendose la API mock (json server) en el puerto 3001 y que el proyecto este corriendo en modo desarrollo , a lo largo de la documentación se explican los comandos para cada caso.

---

## 🚀 Tecnologías

- Vue 3
- TypeScript
- Vite
- Pinia (state management)
- Vue Router
- JSON Server (mock API)
- Sass
- Vitest (testing)
- Happy DOM (testing environment)

---

## 📁 Estructura del proyecto

```bash
API/
  mock/
    db.json
  generate-orders.js

public/

src/
  assets/
  components/
  layouts/
  router/
  services/
  stores/
  styles/
  types/
  views/
  App.vue
  main.ts
  style.css

.gitignore
```

## ⚙️ Instalación
```bash
npm install
```

---

## 🧪 Ejecutar proyecto

### Frontend (modo desarrollo)
```bash
npm run dev
```
---

### API Mock (JSON Server)
```bash
npm run api
```
La API correrá en:

http://localhost:3001

### Crear nuevos datos para la BD (Mock)
```bash
npm run simulateData
```
siempre y cuando se corra en la raíz ,borrara los datos actuales y creara 175 elementos nuevos

---

### Preview build
```bash
npm run preview
```
---

## 🏗️ Build producción
```bash
npm run build
```
---

## 🧪 Tests

### Ejecutar tests
```bash
npm run test
```
### UI de tests
```bash
npm run test:ui
```
### Coverage
```bash
npm run test:coverage
```
---

## 📌 Funcionalidades

- Listado de órdenes de pago
- Filtros por proveedor y estado
- Paginación con carga incremental
- Crear órdenes de pago
- Cambio de estado con reglas:
  - BORRADOR → APROBADA / RECHAZADA
  - APROBADA → PAGADA
- Vista responsive (mobile / table mode)
- Persistencia de filtros en URL

---

## 🧠 Reglas de negocio

- No se permiten duplicados por id
- Transiciones de estado controladas
- Filtros sincronizados con query params


---

## 🧪 API Mock

Archivo:

```bash
/API/mock/db.json
```
 

Endpoints:
```bash
GET /paymentOrders
GET /paymentOrders?id=1
POST /paymentOrders
PATCH /paymentOrders/:id
```
---

## 📌 Scripts disponibles

- dev → Levanta Vite dev server
- build → Build producción
- preview → Preview build
- api → Levanta JSON server
- test → Ejecuta tests
- test:ui → UI de testing
- test:coverage → Coverage de tests

---
# 🧪 generate-orders.js

Este script genera datos mock de órdenes de pago (`paymentOrders`) y los guarda en un archivo `db.json` para ser usado como base de datos simulada en desarrollo.

---

## 📁 ¿Qué hace este script?

- Genera un listado de órdenes de pago aleatorias (175)
- Usa datos ficticios de:
  - Proveedores
  - Conceptos de pago
  - Estados de la orden
- Crea valores aleatorios para:
  - Monto
  - Fecha de creación
- Exporta todo a un archivo JSON (`mock/db.json`)

---

## 📦 Dependencias

El script utiliza únicamente el módulo nativo de Node.js:

```js
import fs from 'fs'
```

# 🎨 Design System (DS) – Responsive y Estilos

Este proyecto implementa un Design System basado en SCSS, el cual define reglas claras para **responsive design, tipografía, colores y componentes reutilizables**.

---

# 📱 Responsive System

 El archivo de responsive define una escala completa de breakpoints:

```scss
$breakpoints: (
  sm: 480px,
  md: 768px,
  lg: 1024px,
  xl: 1280px
);
```

---

## 📌 Breakpoint principal

Aunque existen varios breakpoints, el sistema está orientado principalmente a **mobile-first**, por lo que el breakpoint más importante es:

- `sm` → 480px

---

## ⚙️ Uso en código

Los breakpoints se utilizan mediante mixins importados desde el archivo `responsive.scss`.

```scss
@use "/styles/responsive.scss" as responsive;
```

---

### 📐 Mixin max (hasta el breakpoint)

```scss
.layoutGrid {
  position: relative;
  background-color: var(--grey-700);

  @include responsive.max(sm) {
    display: flex;
    flex-direction: column;

    .hidemobile {
      display: none;
    }
  }
}
```

---

### 📏 Mixin min (desde el breakpoint)

```scss
@include responsive.min(sm) {
  display: grid;
  grid-template-columns: minmax(280px, 300px) 1fr;
  grid-template-rows: $headerHeight 1fr;
  height: 100%;
}
```

---

## 🧠 Concepto clave

- `min(sm)` → desde el breakpoint hacia arriba
- `max(sm)` → hasta el breakpoint hacia abajo

---

## 📱 Clases globales responsive

- `.onlyDesktop`
- `.onlyMobile`

```html
<button class="ginko-button mt-2 min-w-31 onlyDesktop editButton">
  <span class="material-symbols-rounded">edit</span>
  <p>{{'buttons.edit' | translate}}</p>
</button>

<button class="ginko-button mt-2 min-w-31 onlyMobile editButton">
  <span class="material-symbols-rounded">edit</span>
</button>
```

---

# ✍️ Tipografía

En `typography.scss` se definen las variantes tipográficas.

---

## ⚙️ Mixins

```scss
@use "./typography.scss" as typography;
```

```scss
span {
  @include typography.text-variant(button-lg-bold);

  @include responsive.max(sm) {
    @include typography.text-variant(button-sm-bold);
  }
}
```

---

## 🧩 Clases

```html
<p class="body-sm-regular sm:body-md-regular mb-2">
  {{'help.contactBody'|translate}}
</p>
```

---

## 📌 Responsive en clases

```
sm:body-md-regular
```

Equivale a:

```scss
@include min(sm) {
  @include text-variant(body-md-regular);
}
```

---

# 🎨 Colores

```scss
$colors: (
  green: (
    1000: #005f5a,
    900:  #00c7a7,
    800:  #c5e9e9,
    700:  #dcf5f7,
  ),
  pink: (
    1000: #e92553,
    900:  #ff6f96,
    800:  #ffdfea,
    700:  #fff1f5,
  ),
  blue: (
    1000: #001e3e,
    900:  #032a5a,
    800:  #2289f1,
    700:  #c9e1ff,
    600:  #eef7fb,
    500:  #1E4E88
  ),
  grey: (
    1000: #1a1a1a,
    900: #D4D5D5,
    800:  #e0e0e0,
    700:  #f5f6f8,
  ),
  red: (
    900: #ff624e,
    50:  #ffe6e3,
  ),
  orange: (
    900: #ff9800,
    50:  #fff4e5,
  ),
  base: (
    white: #ffffff,
    background: #f7f8f9,
  )
);
```

---

## ⚠️ Regla importante

Todos los colores deben venir del DS.

---

## 🎯 Uso

```scss
.success:not(:hover) {
  border-color: var(--green-900);
  color: var(--green-900);
}

.error:not(:hover) {
  border-color: var(--red-900);
  color: var(--red-900);

  &:hover {
    border-color: var(--blue-800);
  }
}
```

---

# 🧱 Foundation

```scss
.color-primary {
  color: color(blue, 900);
}
```

---

## ⚙️ Variables base

```scss
@include generate-color-vars($light-colors);
--radius:5px;
--cardShadow: 0px 4px 8px  var(--grey-700);
--cardShadowHover: 0px 4px 8px var(--grey-900);
```

---

# 🔘 Buttons

- Variantes
- Estados
- Estándar DS

---

# 📝 Inputs

```html
<div class="inputContainer">
  <div class="ginko-input success">
    <label for="">label</label>
    <span class="material-symbols-outlined">info</span>

    <input type="text" placeholder="placeholder" value="" />

    <span class="material-symbols-outlined">check_circle</span>
  </div>

  <span>Ej: Optional helper text</span>
</div>
```

---

## 📝 Textarea

```html
<div class="ginko-textarea">
  <label for="">{{'help.writeMessage'|translate}}</label>
  <textarea rows="6" [(ngModel)]="question" placeholder=" "></textarea>
</div>
```

---

## ⚠️ Regla importante

Si no hay placeholder, debe usarse:

```
placeholder=" "
```

## 👨‍💻 Autor

Prueba técnica desarrollada con Vue 3 + Pinia + TypeScript.

**Autor:** Juan Sebastian Poveda Florez