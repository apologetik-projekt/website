import type { HeadersFunction } from "@remix-run/cloudflare"
import { json, useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Hero from "~/components/hero"
import Testimonials from "~/components/testimonials"

const testimonals = [
  "Ich bin auf die Wichtigkeit der Apologetik und als Erstes auf euren Channel gestoßen. Seither durfte ich schon so viel lernen und gehe definitiv selbstbewusster in Gespräche, weil ich weiß, dass ich mich nicht für dumm verkaufen lassen muss, weil ich Christin bin und glaube. Das Christentum – nicht nur schön, sondern auch wahr, mit guten Gründen!",
  "Auch wenn Apologetik schon ein Begriff war, mit dem ich etwas anzufangen wusste, habe ich erst durch eure Arbeit wirklich verstanden, wie wichtig Apologetik ist, um selbst nicht ins Schleudern zu geraten und den christlichen Glauben standhaft vorleben und vertreten zu können. Und in wie vielen Bereichen des täglichen Lebens als Christ es einem weiterhilft, wenn man seine Hausaufgaben gemacht.",
  "Am Anfang des Glaubens war ich sehr unsicher, ob das alles wahr ist, was ich hier glaube oder ob es nur „gute Gefühle“ sind, in die man sich reinsteigert. Die Posts und Informationen von Apologetikprojekt haben mir sehr geholfen im Glauben fester zu werden und wirklich zu wissen, dass das Ganze wirklich wahr ist!",
  "Gott sei Dank bin ich auf die wertvolle Arbeit vom Apologetik Projekt gestoßen. Hauptsächlich dank ihrer Videos und Beiträgen habe ich mich dermaßen weiterentwickelt. Ich habe jetzt keine Angst mehr vor Diskussionen mit Nichtchristen und mein Glaube steht auf einem deutlich festeren Fundament als früher.",
]

export const handle = {
  header: 'dark',
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "public, max-age=3600",
})


export const loader = async ({ context }) => {
  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const { data } = await strapi.fetch('slugify/slugs/page/home?populate[0]=pageHeader.image&populate[1]=content')
  data.content.push({
    id: 42,
    __component: "page.testimonials",
    testimonials: testimonals
  })
  return json(data, { headers: { "Cache-Control": "public, max-age=60, stale-if-error=60, stale-while-revalidate=86400" }})
}

export default function Index() {
  const page = useLoaderData<typeof loader>()
  return (
    <>
      <Hero heading={page.pageHeader?.pageTitle} image={page.pageHeader?.image} />
      <main className="max-w-2xl mx-auto mt-24 -mb-10 sm:mb-10 px-5 text-gray-900 break-words">
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
