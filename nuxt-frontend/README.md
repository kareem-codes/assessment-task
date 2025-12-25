# Permit Management System - Frontend

Modern, multilingual permit management system built with **Nuxt 4**, following the **Saudi National Design System (NDS)** guidelines.

## 🎨 Features

- ✅ **Nuxt 4** with Composition API and TypeScript
- ✅ **Multilingual** (Arabic as default, English) with `@nuxtjs/i18n`
- ✅ **RTL/LTR** support with automatic layout switching
- ✅ **Saudi National Design System (NDS)** implementation
- ✅ **Backend-for-Frontend (BFF)** architecture with server routes
- ✅ **Responsive** design for mobile, tablet, and desktop
- ✅ **Reusable components** following NDS specifications
- ✅ **Full CRUD** operations for permit management
- ✅ **Search & Filter** capabilities
- ✅ **Pagination** with metadata
- ✅ **Bulk operations** (multi-select delete)

## 📁 Project Structure

```
nuxt-frontend/
├── app/
│   ├── assets/
│   │   └── css/
│   │       ├── nds-tokens.css      # Saudi NDS color tokens & variables
│   │       └── main.css            # Global styles & utilities
│   ├── components/
│   │   ├── NdsButton.vue           # Button component (5 variants)
│   │   ├── NdsCard.vue             # Card container
│   │   ├── NdsInput.vue            # Text input with validation
│   │   ├── NdsSelect.vue           # Dropdown select
│   │   ├── NdsSpinner.vue          # Loading spinner
│   │   └── NdsStatusBadge.vue      # Status indicator badges
│   ├── layouts/
│   │   └── default.vue             # Main layout with navigation
│   ├── pages/
│   │   ├── index.vue               # Home page with permit cards
│   │   ├── apply.vue               # Application form
│   │   ├── list.vue                # Admin table with search/filters
│   │   └── permit/[id].vue         # Detail/edit view
│   ├── types/
│   │   └── permit.ts               # TypeScript interfaces
│   └── app.vue                     # Root component
├── server/
│   └── api/
│       └── permits/
│           ├── index.ts            # GET/POST proxy
│           └── [id].ts             # GET/PATCH/DELETE proxy
├── i18n/
│   └── locales/
│       ├── ar.json                 # Arabic translations
│       └── en.json                 # English translations
├── .env                            # Environment variables (create from .env.example)
└── nuxt.config.ts                  # Nuxt configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn** or **pnpm**
- Backend API running (see [nestjs-backend README](../nestjs-backend/README.md))

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Configuration

1. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   NUXT_PUBLIC_BACKEND_URL=http://localhost:3000
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

   Frontend will be available at: **http://localhost:3001**

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_PUBLIC_BACKEND_URL` | NestJS backend API URL | `http://localhost:3000` |

## 🎨 Saudi National Design System (NDS)

### Color Palette

#### Primary Colors (Saudi Green)
- `--nds-color-primary-500`: `#25935F` (Main green)
- `--nds-color-primary-700`: `#166A45` (Dark green)
- `--nds-color-primary-300`: `#88D8AD` (Light green)

#### Semantic Colors
- **Success**: `#17B26A` (Green)
- **Warning**: `#F79009` (Gold/Orange)
- **Danger**: `#F04438` (Red)
- **Info**: `#2E90FA` (Blue)

#### Gray Scale
- `--nds-color-gray-50` to `--nds-color-gray-950`

### Status Badges

Following NDS specifications:

| Status | Background | Text | Border |
|--------|------------|------|--------|
| **Pending** | Warning-50 (#FFFAEB) | Warning-700 (#B54708) | Warning-200 |
| **Approved** | Success-50 (#ECFDF3) | Success-700 (#067647) | Success-200 |
| **Rejected** | Danger-50 (#FEF3F2) | Danger-700 (#B42318) | Danger-200 |

### Components Library

#### NdsButton
```vue
<NdsButton variant="primary" @click="handleClick">
  Submit
</NdsButton>
```

**Variants:** `primary`, `secondary`, `success`, `danger`, `outline`

#### NdsInput
```vue
<NdsInput
  v-model="form.name"
  label="Full Name"
  placeholder="Enter your name"
  :required="true"
  :error="errors.name"
/>
```

#### NdsSelect
```vue
<NdsSelect
  v-model="form.status"
  label="Status"
  :options="statusOptions"
  :required="true"
/>
```

#### NdsCard
```vue
<NdsCard>
  <h3>Card Title</h3>
  <p>Card content...</p>
</NdsCard>
```

#### NdsStatusBadge
```vue
<NdsStatusBadge :status="permit.status" />
```

**Statuses:** `PENDING`, `APPROVED`, `REJECTED`

## 🌍 Internationalization (i18n)

### Supported Languages

- **Arabic (ar)** - Default
- **English (en)**

### Adding Translations

Edit `i18n/locales/ar.json` or `en.json`:

```json
{
  "nav": {
    "home": "الرئيسية",
    "apply": "تقديم طلب"
  },
  "permits": {
    "title": "الطلبات"
  }
}
```

### Using Translations

```vue
<template>
  <h1>{{ $t('permits.title') }}</h1>
</template>
```

### RTL/LTR Support

Layout automatically switches based on current locale:
- Arabic: RTL (Right-to-Left)
- English: LTR (Left-to-Right)

Uses CSS logical properties:
- `margin-inline-start` instead of `margin-left`
- `padding-block-end` instead of `padding-bottom`

## 🔌 API Integration (BFF Pattern)

### Server Routes Architecture

Frontend **never** calls backend directly. All API calls go through Nuxt server routes:

```
Browser → Nuxt Server Routes → NestJS Backend
         (localhost:3001)      (localhost:3000)
```

### Example: Fetching Permits

```vue
<script setup lang="ts">
// Frontend code - calls Nuxt server route
const { data: permits } = await useFetch('/api/permits', {
  query: { page: 1, limit: 10 }
});
</script>
```

## 📄 Available Pages

### 1. Home (`/`)
- Grid of permit cards with pagination
- Status badges
- Quick view of permit details
- Navigate to detail page

### 2. Apply (`/apply`)
- Application form with validation
- Required fields marked with `*`
- Real-time validation feedback
- Success/error notifications

### 3. List (`/list`)
- Admin management table
- Search by name or license number
- Filter by status (All, Pending, Approved, Rejected)
- Bulk select and delete
- Pagination controls

### 4. Detail/Edit (`/permit/:id`)
- View mode: Display all permit details
- Edit mode: Update permit information
- Status dropdown with color-coded options
- Delete permit option

## 🎯 NPM Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3001)

# Production
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3001 is occupied:
```bash
PORT=3002 npm run dev
```

### Backend Connection Issues

1. Ensure backend is running on `http://localhost:3000`
2. Check `.env` file has correct `NUXT_PUBLIC_BACKEND_URL`
3. Verify backend CORS settings allow `http://localhost:3001`

### Module Resolution Errors

Types must be in `app/types/` directory (not root `types/`):
```
✅ nuxt-frontend/app/types/permit.ts
❌ nuxt-frontend/types/permit.ts
```

## 📚 Resources

- [Nuxt 4 Documentation](https://nuxt.com)
- [Saudi National Design System](https://nds.sa/)
- [Vue 3 Documentation](https://vuejs.org)
- [@nuxtjs/i18n Documentation](https://i18n.nuxtjs.org)
- [NestJS Backend README](../nestjs-backend/README.md)
