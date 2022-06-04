import { json, LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import type { PageData } from '~/types/kirby'
import ContactForm from '~/components/contact-form'
//import Member from '~/components/member'
import { Strapi } from '~/api/strapi'

interface LoaderData extends PageData {
  env: any
}

export const loader: LoaderFunction = async ({ context, params }) => {
  const slugArray = params["*"]?.split("/")
  const slug = slugArray?.[slugArray.length - 1]

  const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
  const page = await strapi.fetch(`slugify/slugs/page/${slug}?populate[0]=pageHeader.image&populate[1]=content`)

  const env = {
    RECAPTCHA_PUBLIC_KEY: context.env.RECAPTCHA_PUBLIC_KEY
  }

  return json({ ...page.data, env })
}

export default function Slug() {
  const {pageHeader, content, env} = useLoaderData()

  return (
    <main className="max-w-4xl mx-auto px-5 pt-5 pb-10">

      {pageHeader && !pageHeader.showImage && (
        <h1 className="font-extrabold font-mono text-6xl mt-4 mb-14 text-center">{pageHeader.pageTitle}</h1>
      )}

      {pageHeader?.showImage && (
        <div className='max-h-screen -mx-[4.525rem] block mb-8 bg-black'>
          <div className='aspect-16/9 w-full h-[45vh] bg-cover flex justify-center items-center' style={{backgroundImage: `url(${pageHeader.image.url})`}}>
            <h1 className='text-white font-mono text-center text-7xl font-extrabold uppercase drop-shadow'>{pageHeader.pageTitle}</h1>
          </div>
        </div>
      )}

      {content?.map((block) => {

        // *** EDITOR ***
        if (block.__component === "page.editor") {
          return (
            <div key={block.id} className="prose max-w-2xl my-2 mx-auto md:prose-base" dangerouslySetInnerHTML={{ __html: block.editor }}></div>
          )
        }

        // *** SNIPPET ***
        if (block.__component === "page.snippets") {
          if (block.name == "contact_form") {
            return <ContactForm recaptchaKey={env.RECAPTCHA_PUBLIC_KEY} key={block.id}  />
          }
        }

        // *** TEAM ***
        if (block.__component === "page.team") return (
          <div key={block.id} className="md:flex flex-wrap justify-between w-full mb-8">
            {/* {block.content?.members?.map((member) => <Member member={member} key={member.name} />)} */}
          </div>
        )
      })}
    </main>
  )
}