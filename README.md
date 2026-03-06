# Oberemchuk

Personal portfolio website for Serhii Oberemchuk built with Next.js.

## Features

- App Router pages for services, portfolio, legal pages, and custom `not-found`
- Server-side project loading via `lib/projects-server.ts`
- Portfolio listing and dynamic project pages at `/portfolio/[slug]`
- Strong semantic HTML structure for content sections and navigation
- SEO setup: metadata, Open Graph, sitemap, robots, and JSON-LD
- Responsive UI with reusable components

## Tech Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Nodemailer

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```env
SITE_URL=https://www.oberemchuk.site
PROJECTS_API_BASE_URL=https://v0-adminca-bk.vercel.app
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production bundle
- `npm run start` - start production server
- `npm run lint` - run ESLint

## API Endpoints

- `POST /api/contact`

## Project Structure

- `app/(site)` - public pages
- `app/api` - server routes
- `components` - UI and page sections
- `lib` - server utilities and shared config
- `public` - static assets
