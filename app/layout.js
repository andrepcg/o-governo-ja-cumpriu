import { GoogleAnalytics } from '@next/third-parties/google'

import "./styles/tailwind.css";
import "./styles/utilities.css";
import "./styles/global.css";

// import NavBar from '@/app/_components/nav-bar'
// TODO: enable navbar when online

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000" />
        <meta name="description" content="A seguir as promessas eleitorais do Governo Português desde 2024"></meta>
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:url" content="https://ogovernojacumpriu.pt/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="O Governo Já Cumpriu?" />
        <meta property="og:description" content="A seguir as promessas eleitorais do Governo Português desde 2024" />
        <meta property="og:image" content="https://ogovernojacumpriu.pt/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="bg-white">
        {/* <Header /> */}
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="px-4 mx-auto max-w-screen-lg ">
            {/* <NavBar /> */}
            {children}
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
          </div>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
