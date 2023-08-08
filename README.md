# Entertainment Web App
![entertainment-web-app](https://github.com/maricastroc/entertainment-web-app/assets/121824373/a682e689-4856-4e92-9f2c-5c42612b535e)


## 📚 Project Description

This project is an entertainment application that uses TheMovieDB API to display TV series and movies from different categories - such as popular, trending, on air, and top rating. The application provides details about the synopsis and technical information for each displayed TV series/movie card. Additionally, it includes an advanced search bar to facilitate searching for specific titles. The application also provides the option to explore these media items through various available genres. Additionally, it offers social authentication using Next oAuth, allowing users to sign in using their Gmail or GitHub accounts.



## 📌 What did I learn?

The application's main challenge was handling the extensive number of routes available for user navigation. To streamline this organization, I created a lib/tbmd.ts file to define all the endpoints used across different pages of the application. This project provided an excellent opportunity to practice passing parameters through routes and server-side data rendering.

I leveraged Next.js's server-side rendering feature, using `getServerSideProps`, to render database information on the server-side. NextAuth.js library was employed to implement social user authentication.

## 🔍 Links
[Preview Site](https://book-wise-puce.vercel.app/)

## 💻 My Process
### Built with:

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.Js](https://nextjs.org/)
- [Next Auth](https://next-auth.js.org/)
- [Next SEO](https://www.npmjs.com/package/next-seo)
- [Stitches](https://stitches.dev/)
- [font-awesome](https://fontawesome.com/)
- [phosphor-react](https://phosphoricons.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
<br/>

## ℹ️ How to run the application?

> Clone the repository:

```bash
git clone https://github.com/maricastroc/entertainment-web-app
```

> Install the dependencies:

```bash
npm install
```

> Rename the .env.example file to .env and add the necessary information to it.

> Start the service:

```bash
npm run dev
```

> ⏩ Access [http://localhost:3000](http://localhost:3000) to view the web application.
