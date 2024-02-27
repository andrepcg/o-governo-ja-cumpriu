import { GoogleAnalytics } from '@next/third-parties/google'

import "./styles/tailwind.css";
import "./styles/utilities.css";
import "./styles/global.css";

import NavBar from '@/app/_components/nav-bar'
import Search from '@/app/_components/search';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
            <Search />
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
          </div>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
