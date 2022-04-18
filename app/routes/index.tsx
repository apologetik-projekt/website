import { LoaderFunction } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Kirby } from "~/api/kirby"
import Hero from "~/components/hero"
import Testimonials from "~/components/testimonials"



export const handle = {
  header: 'dark',
}

export const links = () => [
  { rel: "preload", as: "image", href: "https://beta.apologetik-projekt.de/_next/image?url=%2Fconversation.jpg&w=640&q=75" },
]



export const loader: LoaderFunction = async ({ context }) => {
  const kirby = new Kirby(context.env.KIRBY_API_URL, context.env.KIRBY_AUTH_TOKEN)
  const [page] = await Promise.all([
    kirby.fetchKQL({
      "query": "site.find('home')",
      "select": {
        "title": true,
        "hero": true,
        //"featuredVideos": "page.content.videos.toStructure()",
        "block": "page.content.block.toBlocks",
        "page": "page.content"
      }
    }),
  ])

  return { page }
}

export default function Index() {
  const { page } = useLoaderData()
  return (
    <>
      <Hero heading={page.hero} />
      <main className="max-w-2xl mx-auto mt-24 px-4 pb-20 text-gray-900 break-words">
        {page.block.map((block) => {
          if (block.type === "text") return (
            <div key={block.id} className="prose-lg my-2 md:prose-lg" dangerouslySetInnerHTML={{ __html: block.content.text }}></div>
          )
          if (block.type === "gap") {
            const size = { small: 5, medium: 10, large: 16 }
            return (<div key={block.id} className={`w-full h-${size[block.content.gap]}`}></div>)
          }
          if (block.type == 'heading') {
            const Heading = block.content.level
            return (<div key={block.id} className="prose md:prose-base my-2"><Heading><span dangerouslySetInnerHTML={{ __html: block.content.text }}></span></Heading></div>)
          }
          if (block.type == 'testimonials') return <Testimonials key={block.id} quotes={block.content.testimonials} />
        })}
      </main>
    </>
  )
}
