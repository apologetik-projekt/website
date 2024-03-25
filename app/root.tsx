import {
  Links,
  LiveReload,
  Meta,
  type MetaFunction,
  Scripts,
  ScrollRestoration,
  json,
  useLocation,
  useMatches,
  Outlet,
} from "@remix-run/react"
import styles from "./tailwind.css"
import fonts from "./styles/fonts.css"
import Navigation from "~/components/navigation"
import { useLoaderData } from "@remix-run/react"
import Footer from "./components/footer"
import MobileNavigation from "./components/mobile-nav"
import { Strapi } from "./api/strapi"
import { ErrorBoundary as GlobalErrorBoundary } from "./components/error-boundary"
// import { trackPageview } from './api/plausible'
// import { useEffect } from "react"
import type { NavigationItem } from "./types/navigation"
import type { LinksFunction } from "@remix-run/react/dist/routeModules"
// import { isbot } from "isbot"

export const meta: MetaFunction = () => [{ 
  title: "Das Apologetik Projekt - Christliche Apologetik",
}, {
  name: "description",
  content: "Christentum - nicht nur schön, sondern auch wahr. Christen zurüsten. Zweiflern begegnen. Skeptikern antworten.",
},]

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fonts },
  { rel: "stylesheet", href: styles },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png"},
  { rel: "manifest", href: "/site.webmanifest"},
  { rel: "mask-icon", href: "/favicon.svg", color: "#000000"},
  { rel: "shortcut icon", href: "/favicon.svg"},  
  { rel: "preload", href: "/fonts/SpaceGroteskVariable.woff2?v=2.0", as: "font", type: "font/woff2", crossOrigin: "anonymous"},
  { rel: "preload", href: "/fonts/InterVariable.woff2?v=4.0", as: "font", type: "font/woff2", crossOrigin: "anonymous"},
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

  // useEffect(() => {
  //   if (!isbot(navigator.userAgent)) {
  //     trackPageview();
  //   }
  // }, [location]);

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta charSet="utf-8"/>
        <meta httpEquiv="Accept-CH" content="Viewport-Width, Sec-CH-Viewport-Width" />
        <Meta />
        <Links />
      </head>
      <body className={`bg-gray-50 ${isBlogRoute ? "dark:bg-[#0E0D0D]" : ""} min-h-screen flex flex-col`}>
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