# Carrd Clone

A link-in-bio application that allows users to create personalized profile pages with custom themes, fonts, and links.

## What This App Does

- **User Authentication**: OAuth login with Google and GitHub using NextAuth
- **Custom Profile Pages**: Create a personalized page at `/{username}` with profile image, description, and links
- **Theme Customization**: Choose from 6 different color themes (soft-neutral, sage, dark, pastel-blue, soft-pink, warm-mono)
- **Font Selection**: Pick from 6 Google Fonts (Inter, Source Sans 3, Manrope, DM Sans, Poppins, IBM Plex Sans)
- **Link Management**: Add, edit, and reorder multiple links on your profile
- **Image Upload**: Upload custom profile images or use image URLs
- **Theme Preview**: Test different themes and fonts before applying them

## Technologies Used

### Frontend

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Redux Toolkit 2.11.2** - State management for themes/fonts

### Backend

- **NextAuth v5 (beta)** - Authentication with OAuth providers
- **MongoDB** - Database for storing user pages
- **Mongoose 9.0.2** - MongoDB object modeling

### Other

- **Google Fonts** - Typography
- **FileReader API** - Client-side image processing (base64 encoding)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

Create a `.env.local` file with:

- `MONGO_CONN_STRING` - MongoDB connection string
- `AUTH_SECRET` - NextAuth secret
- `AUTH_GOOGLE_ID` - Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret
- `AUTH_GITHUB_ID` - GitHub OAuth client ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth client secret
