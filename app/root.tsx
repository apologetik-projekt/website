import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useMatches,
} from "@remix-run/react"
import { MetaFunction, LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare"
import styles from "./tailwind.css"
import Navigation from "~/components/navigation"
import { useLoaderData } from "@remix-run/react"
import Footer from "./components/footer"
import MobileNavigation from "./components/mobile-nav"
import { AnimatePresence, motion } from "framer-motion"
import AnimatedRoute from "./components/animated-route"
import HttpStatusCode from "./types/http_status_code"
import clsx from "clsx"
import { Strapi } from "./api/strapi"

export const meta: MetaFunction = () => ({ 
  title: "Das Apologetik Projekt - Christliche Apologetik",
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
      <body className="min-h-screen">
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

export function CatchBoundary() {
  const caught = useCatch()
  const oops = caught.status !== HttpStatusCode.SERVICE_UNAVAILABLE
  return (
    <html>
      <head>
        <title>{oops ? 'Oops!' : 'Vorübergehend nicht erreichbar!'}</title>
        <Meta />
        <Links />
      </head>
      <body className={clsx("h-screen p-3 md:p-6", oops ? 'bg-red-500/80' : 'bg-[#f8af3ccc]')}>
        <main className="h-full p-5 md:p-8 bg-white shadow-sm rounded">
          {
            oops 
            ? <h1 className="font-bold text-3xl">{caught.status} - {caught.statusText}</h1>
            : <Maintenance />
          }
        </main>
      </body>
    </html>
  )
}

function Maintenance() {
  return (
    <div className="mt-8 md:mt-18 p-1">
      <img height="266" width="400" className="w-full mx-auto md:w-[400px] mb-8 md:mb-10" src="/maintenance.svg" alt="Bauarbeiten" />
      <section className="mt-4 text-gray-800 max-w-prose mx-auto">
        <h2 className="md:text-center text-2xl md:text-4xl font-bold md:font-extrabold mb-4 md:mb-5 text-gray-900 leading-tight">Vorübergehend nicht erreichbar!</h2>
        <p className="md:text-center break-normal">
          Diese Seite ist aktuell leider nicht er&shy;reich&shy;bar. Wir arbeiten daran sie schnellst&shy;möglichst wieder zur Verfügung zu stellen. 
          Komme gerne später nochmal vorbei.
        </p>
        <p className="md:text-center break-normal mt-4 md:mt-2">
          In der Zwischenzeit kannst du auf <a className="font-medium text-black underline underline-offset-1 transition-colors hover:text-blue-800" target="_blank" href="https://instagram.com">Instagram</a> oder <a className="font-medium text-black underline underline-offset-1 transition-colors hover:text-blue-800" target="_blank" href="https://youtube.com">YouTube</a> mehr über die Arbeit des Apologetik Projekts erfahren.
        </p>
      </section>
    </div>
  )
}