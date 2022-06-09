import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from "@remix-run/react"
import { MetaFunction, LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare"
import styles from "./tailwind.css"
import Navigation from "~/components/navigation"
import { useLoaderData } from "@remix-run/react"
import Footer from "./components/footer"
import MobileNavigation from "./components/mobile-nav"
import { AnimatePresence } from "framer-motion"
import AnimatedRoute from "./components/animated-route"
import { Strapi } from "./api/strapi"
import { CatchBoundary as GlobalCatchBoundary } from "./components/catch-boundary"
import { trackPageview } from './api/plausible'
import { useEffect } from "react"

export const meta: MetaFunction = () => ({ 
  title: "Das Apologetik Projekt - Christliche Apologetik",
  description: "Christentum - nicht nur schön, sondern auch wahr. Christen zurüsten. Zweiflern begegnen. Skeptikern antworten.",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: "https://api.fonts.coollabs.io/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"},
  { rel: "stylesheet", href: "https://api.fonts.coollabs.io/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"},
  // { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png"},
  // { rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon/favicon-16x16.png"},
  // { rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon/favicon-32x32.png"},
  { rel: "manifest", href: "/site.webmanifest"},
  { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#000000"},
  { rel: "shortcut icon", href: "/favicon/favicon.svg"},  
]

export const loader: LoaderFunction = async ({context}) => {
  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const navigation = await strapi.fetch('navigation/render/navigation?type=TREE')
  return json({ navigation }, {
    headers: {
      'Cache-Control': 'max-age=3600, s-maxage=30'
    }
  })
}

export default function App() {
  const { navigation } = useLoaderData()
  const location = useLocation()
  const matches = useMatches()
  const currentHandle = matches?.[matches.length - 1]?.handle
  const headerTheme = currentHandle ? currentHandle.header : "light"  

  useEffect(() => {
    trackPageview();
  }, [location]);

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://api.fonts.coollabs.io" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <MobileNavigation navigation={navigation}/>
        <Navigation navigation={navigation} background={headerTheme}/>

        <AnimatePresence exitBeforeEnter>
          <AnimatedRoute key={location.pathname}>
            <Outlet />
          </AnimatedRoute>
        </AnimatePresence>      

        <Footer />
        <Scripts />
        <LiveReload />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export const CatchBoundary = GlobalCatchBoundary