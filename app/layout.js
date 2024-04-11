import { GoogleAnalytics } from '@next/third-parties/google'

import "./styles/tailwind.css";
import "./styles/utilities.css";
import "./styles/global.css";

import NavBar from '@/app/_components/nav-bar'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const LF_TRACKING_ID = process.env.NEXT_PUBLIC_LF_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <meta name="theme-color" content="#000" />
        <meta name="description" content="A seguir as promessas eleitorais do Governo Português desde 2024"></meta>
        <meta name="keywords" content="eleições legislativas portugal, sondagens, legislativas, eleições, 2024, governo, promessas, programa eleitoral, cumprir, iniciativa liberal, partido socialista, aliança democrática, chega, livre, bloco esquerda, open-source, github, pan"></meta>
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:url" content="https://ogovernojacumpriu.pt/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="O Governo Já Cumpriu?" />
        <meta property="og:description" content="A seguir as promessas eleitorais do Governo Português desde 2024" />
        <meta property="og:image" content="https://ogovernojacumpriu.pt/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {LF_TRACKING_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(ss,ex){window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('${LF_TRACKING_ID}');
              `
            }}>
          </script>
        )}
      </head>
      <body className="bg-white">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="px-4 mx-auto max-w-screen-lg ">
            <NavBar />
            {children}
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
          </div>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
