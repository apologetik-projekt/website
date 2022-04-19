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
import { Kirby } from "./api/kirby"
import Navigation from "~/components/navigation"
import { useLoaderData } from "@remix-run/react"
import Footer from "./components/footer"
import MobileNavigation from "./components/mobile-nav"
import { AnimatePresence, motion } from "framer-motion"
import AnimatedRoute from "./components/animated-route"
import HttpStatusCode from "./types/http_status_code"
import clsx from "clsx"

export const meta: MetaFunction = () => ({ 
  title: "Das Apologetik Projekt - Christliche Apologetik",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
]

export const loader: LoaderFunction = async ({context}) => {
  const kirby = new Kirby(context.env.KIRBY_API_URL, context.env.KIRBY_AUTH_TOKEN)
  const navigation = await kirby.getNavigation()
  return json({ navigation })
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />  
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
    <div className="mt-14 md:mt-18 p-1">
      <img height="400" width="266" className="w-full mx-auto md:w-[400px] mb-8 md:mb-10" src="/maintenance.svg" alt="Bauarbeiten" />
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