import { json, LoaderFunction } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Hero from "~/components/hero"
import Testimonials from "~/components/testimonials"



export const handle = {
  header: 'dark',
}


export const loader: LoaderFunction = async ({ context }) => {
  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const { data } = await strapi.fetch('slugify/slugs/page/home?populate[0]=pageHeader.image&populate[1]=content')

  return json(data)
}

export default function Index() {
  const page = useLoaderData()
  return (
    <>
      <Hero heading={page.pageHeader?.pageTitle} imageUrl={page.pageHeader?.image.url} />
      <main className="max-w-2xl mx-auto mt-24 px-5 pb-20 text-gray-900 break-words">
        {page.content?.map((block) => {

          // *** EDITOR ***
          if (block.__component == "page.editor") return (
            <div key={block.id} className="prose-lg my-2 md:prose-lg prose-headings:font-mono selection:bg-sky-300" dangerouslySetInnerHTML={{ __html: block.editor }}></div>
          )

          // *** TESTIMONIALS ***
          if (block.__component == "page.testimonials") {
            return <Testimonials key={block.id} quotes={block.content.testimonials} />
          }

        })}
      </main> 
    </>
  )
}
