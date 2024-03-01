import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Scripts,
  ScrollRestoration,
  json,
  useLocation,
  useMatches,
  Outlet,
} from "@remix-run/react"
import styles from "./tailwind.css"
import Navigation from "~/components/navigation"
import { useLoaderData } from "@remix-run/react"
import Footer from "./components/footer"
import MobileNavigation from "./components/mobile-nav"
import { AnimatePresence } from "framer-motion"
import { Strapi } from "./api/strapi"
import { ErrorBoundary as GlobalErrorBoundary } from "./components/error-boundary"
import { trackPageview } from './api/plausible'
import { useEffect } from "react"
import { NavigationItem } from "./types/navigation"
import { LinksFunction } from "@remix-run/react/dist/routeModules"


export const meta: MetaFunction = () => [{ 
  title: "Das Apologetik Projekt - Christliche Apologetik",
  description: "Christentum - nicht nur schön, sondern auch wahr. Christen zurüsten. Zweiflern begegnen. Skeptikern antworten.",
}]

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: "https://api.fonts.coollabs.io/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"},
  // { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png"},
  // { rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon/favicon-16x16.png"},
  // { rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon/favicon-32x32.png"},
  { rel: "manifest", href: "/site.webmanifest"},
  { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#000000"},
  { rel: "shortcut icon", href: "/favicon/favicon.svg"},  
]

export const loader = async ({ context }) => {
  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const navigation = await strapi.fetch('navigation/render/navigation?type=TREE') as any as NavigationItem[]
  return json({ navigation }, {
    headers: {
      'Cache-Control': 'max-age=3600, s-maxage=30'
    }
  })
}

export default function App() {
  const { navigation } = useLoaderData<typeof loader>() as any as { navigation: NavigationItem[] }
  const location = useLocation()
  const isBlogRoute = location.pathname.includes("blog")
  const matches = useMatches()
  const currentHandle = matches?.[matches.length - 1]?.handle
  const headerTheme = currentHandle ? currentHandle["header"] : "light"  

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
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta charSet="utf-8"/>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta httpEquiv="Accept-CH" content="Viewport-Width, Sec-CH-Viewport-Width" />
        <Meta />
        <Links />
      </head>
      <body className={`bg-gray-50 ${isBlogRoute ? "dark:bg-gray-900" : ""} min-h-screen flex flex-col`}>
        <MobileNavigation navigation={navigation}/>
        <Navigation navigation={navigation} background={headerTheme}/> 
        <Outlet />
        <Footer />
        <Scripts />
        <LiveReload />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export const ErrorBoundary = GlobalErrorBoundary