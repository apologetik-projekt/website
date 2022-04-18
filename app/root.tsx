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

export const meta: MetaFunction = () => ({ 
  title: "New Remix App" 
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
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-red-100 text-red-900 p-6">
        <h1 className="font-bold text-3xl">
          {caught.status} - {caught.statusText}
        </h1>        
        <Scripts />
      </body>
    </html>
  )
}