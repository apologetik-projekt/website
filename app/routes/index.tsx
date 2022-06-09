import { json, LoaderFunction } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Hero from "~/components/hero"
import Testimonials from "~/components/testimonials"

const testimonals = [{
  name: "Miri",
  text: "<p>Danke, f\u00fcr deine Arbeit und den guten Content! Ich feier es! Vor allem will ich es aber auch anwenden.<\/p>"
},
{
  name: "Metin",
  text: "<p>Ein Kumpel hat mir den Channel empfohlen. Starke erste Message! \ud83d\udd25 Bin gespannt was noch kommt.<\/p>"
},
  {
    name: "Helena",
    text: "<p>Echt interessant! Die Frage muss ich mir bei zuk\u00fcnftigen Evangelisationen merken \ud83d\ude2c<\/p>"
}]

export const handle = {
  header: 'dark',
}


export const loader: LoaderFunction = async ({ context }) => {
  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const { data } = await strapi.fetch('slugify/slugs/page/home?populate[0]=pageHeader.image&populate[1]=content')
  data.content.push({
    id: 42,
    __component: "page.testimonials",
    testimonials: testimonals
  })
  console.log(data)
  return json(data)
}

export default function Index() {
  const page = useLoaderData()
  return (
    <>
      <Hero heading={page.pageHeader?.pageTitle} imageUrl={page.pageHeader?.image?.url} />
      <main className="max-w-2xl mx-auto mt-24 px-5 pb-20 text-gray-900 break-words">
        {page.content?.map((block) => {

          // *** EDITOR ***
          if (block.__component == "page.editor") return (
            <div key={block.id} className="prose-lg my-2 md:prose-lg prose-headings:font-mono selection:bg-sky-300" dangerouslySetInnerHTML={{ __html: block.editor }}></div>
          )

          // *** TESTIMONIALS ***
          if (block.__component == "page.testimonials") {
            return <Testimonials key={block.id} quotes={block.testimonials} />
          }

        })}
      </main> 
    </>
  )
}
