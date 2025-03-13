# URL Shortener Application

A modern URL shortening application built with Next.js 15, React 19, and PostgreSQL.

## 🧰 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Next.js Server Actions, Next-Auth
- **Database**: PostgreSQL, Drizzle ORM
- **AI Integration**: Google Gemini API
- **Authentication**: Next-Auth with JWT strategy
- **Deployment**: Ready for Vercel deployment

## 🚀 Features

- Custom URL shortening with optional custom slugs
- QR code generation for shortened URLs
- User authentication and management
- User dashboard with link analytics
- Admin dashboard for system management
- AI-powered insights using Google Gemini

## 📋 Prerequisites

- Node.js 18.x or later
- PostgreSQL 13 or later
- Google Gemini API key

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/2tay/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   # or yarn, pnpm, bun
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3000
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. Set up the database:
   ```bash
   npx drizzle-kit push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🚀 Deployment

This application is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables
4. Deploy!

## 📝 License

[MIT](LICENSE)

## 🔗 Acknowledgements

- Powered by [Next.js](https://nextjs.org)
- Database management with [Drizzle ORM](https://orm.drizzle.team)
- Authentication via [NextAuth.js](https://next-auth.js.org)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- AI capabilities from [Google Gemini](https://ai.google.dev)