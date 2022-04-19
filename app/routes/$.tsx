import { json, LoaderFunction } from '@remix-run/cloudflare'
import { Meta, useCatch, useLoaderData } from '@remix-run/react'
import { Kirby } from "~/api/kirby"
import type { PageData } from '~/types/kirby'
import ContactForm from '~/components/contact-form'
import Member from '~/components/member'
import HttpStatusCode from '~/types/http_status_code'

interface LoaderData extends PageData {
  env: any
}

export const loader: LoaderFunction = async ({ context, params }) => {
  const slugArray = params["*"]?.split("/")
  const slug = Array.isArray(slugArray) ? slugArray.join('+') : params["*"]
  const kirby = new Kirby(context.env.KIRBY_API_URL, context.env.KIRBY_AUTH_TOKEN)
  const page = await kirby.getPage(slug || '')
  const env = {
    RECAPTCHA_PUBLIC_KEY: context.env.RECAPTCHA_PUBLIC_KEY
  }

  return json({ ...page, env })
}

export default function Slug() {
  const { content, env } = useLoaderData<LoaderData>()

  return (
    <main className="max-w-4xl mx-auto px-4 pt-4 pb-10">
      {content?.blocks.map((block) => {

        // *** HERO ***
        if (block.type === "hero") return (
          <h1 key={block.id} className="font-extrabold text-6xl  mt-4 mb-14 text-center">{block.content.heading}</h1>
        )

        // *** TEXT ***
        if (block.type === "text") return (
          <div key={block.id} className="prose max-w-2xl my-2 mx-auto md:prose-base" dangerouslySetInnerHTML={{ __html: block.content.text }}></div>
        )

        // *** HEADING ***
        if (block.type == 'heading') {
          const Heading = block.content.level || 'h1'
          return (<div key={block.id} className="prose max-w-2xl mx-auto md:prose-base"><Heading><span dangerouslySetInnerHTML={{ __html: block.content.text }}></span></Heading></div>)
        }

        // *** TEAM ***
        if (block.type === "team") return (
          <div key={block.id} className="md:flex flex-wrap justify-between w-full mb-8">
            {block.content?.members?.map((member) => <Member member={member} key={member.name} />)}
          </div>
        )

        // *** SNIPPET (Was ist das?)***
        if (block.type === "snippet") {
          return <ContactForm recaptchaKey={env.RECAPTCHA_PUBLIC_KEY} key={block.id}  />
        }

      })}
    </main>
  )
}