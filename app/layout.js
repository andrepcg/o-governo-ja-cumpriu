import "./styles/tailwind.css";
import "./styles/utilities.css";
import "./styles/global.css";

import { Analytics } from "@vercel/analytics/react"
import NavBar from '@/app/_components/nav-bar'
import Search from '@/app/_components/search';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body className="bg-white">
        {/* <Header /> */}
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="px-4 mx-auto max-w-screen-lg ">
            <NavBar />
            {children}
            <Analytics />
            <Search />
          </div>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
