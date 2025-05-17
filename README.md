# Entertainment Web App
![entertainment-web-app](https://github.com/maricastroc/entertainment-web-app/assets/121824373/a682e689-4856-4e92-9f2c-5c42612b535e)


## 📚 Project Description

This project is an entertainment application that uses TheMovieDB API to display TV series and movies from different categories - such as popular, trending, on air, and top rating. The application provides details about the synopsis and technical information for each displayed TV series/movie card. Additionally, it includes an advanced search bar to facilitate searching for specific titles. The application also provides the option to explore these media items through various available genres. Additionally, it offers social authentication using Next oAuth, allowing users to sign in using their Gmail or GitHub accounts.

## 🌟 Key Features
  ### Enhanced Discovery
- Browse movies/series by category (Trending, Popular, Top Rated)
- Advanced search for titles, people (actors/directors), and genres
- Detailed media pages with synopsis, cast, reviews, and recommendations

### User Experience
- OAuth Authentication via GitHub/Gmail (NextAuth.js)
- Bookmark system - Save movies/series to watch later
- Write and rate reviews
- Upvote/downvote others' comments

### Technical Highlights
- Test-driven development
- Jest unit/integration tests for critical flows (auth, reviews, bookmarks)
- Mocked API responses & Prisma operations

### Optimized performance
- Server-side rendering (getServerSideProps)
- Client-side caching for frequent queries

## 🛠️ Tech Stack

| Category        | Technologies                          |
|----------------|----------------------------------------|
| **Framework**   | Next.js 13 (App Router)               |
| **Styling**     | Stitches, CSS Modules                 |
| **Database**    | PostgreSQL + Prisma ORM               |
| **Authentication** | NextAuth.js                      |
| **Testing**     | Jest, React Testing Library           |
| **Tooling**     | ESLint, Prettier                      |

## 🔍 Links
[Preview Site](https://maricastroc-entertainment-web-app.vercel.app/)

## ℹ️ How to run the application?

### Prerequisites
- Node.js 18+
- TMDB API key
- GitHub/OAuth credentials for auth

> Clone the repository:

```bash
git clone https://github.com/maricastroc/entertainment-web-app
```

> Install the dependencies:

```bash
npm install
```

> Rename the .env.example file to .env and add the necessary information to it.

> Generate the Prisma client and apply database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

> Start the service:

```bash
npm run dev
```

> Run all tests:

```bash
npm test
npm run test:coverage
```
