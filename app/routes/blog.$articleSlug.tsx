import { json, useParams } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Citation from "~/components/citation"
import { BASE_URL } from "~/utils/constants"
import { Image } from "~/components/image"
import { HeadersFunction, MetaFunction } from "@remix-run/cloudflare"
import { useEffect, useRef, useState } from "react"
import { AudioPlayer } from "~/components/audio-player"

export const meta = ({data: { article }, location}) => [{
	title: `${article.title} | Apologetik Projetkt`,
	site_name: 'Das Apologetik Projekt',
	'og:url': BASE_URL + location.pathname,
	'og:title': `${article.seo_title ?? article.title} | Apologetik Projekt`,
	'og:description': article.description,
	'og:image': article.image?.url,
	'twitter:card': 'summary'
}, {
		name: "description",
		content: article.description,
}]

export const links = () => [
  { rel: "stylesheet", href: "https://api.fonts.coollabs.io/css2?family=Noticia+Text&display=swap"},
]

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "public, max-age=3600",
})

export const loader = async ({ params, context }) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: article } = (await strapi.fetch(`slugify/slugs/article/${params.articleSlug}?populate=author.image,image,content,readingTime`))
  return json({ article }, { headers: { "Cache-Control": "public, max-age=60, stale-if-error=60, stale-while-revalidate=86400" }})
}

const safeDate = new Date()
safeDate.setDate(safeDate.getDate() - 1)

export default function Article(){
	const { article } = useLoaderData<any>()
	const { articleSlug } = useParams() as { articleSlug: string }

	return (	
		<article className="max-w-4xl mx-auto p-4 pb-10 w-full">
			<header className="max-w-2xl mx-auto">
				<h1 className="font-extrabold md:text-balance font-mono dark:text-white text-5xl md:text-7xl md:pt-2 relative z-20" style={{ viewTransitionName: "title"}}>{article?.title}</h1>
				<Author author={article?.author} date={article?.date} />	
			</header>

			<div className="my-3 -mx-4 md:m-4 md:mb-6" style={{ viewTransitionName: "image"}}>
				<Image
					className="object-cover bg-black origin-center w-full aspect-video" 
					src={article?.image?.url}
					blurDataURL={article?.image?.placeholder}
					alt="Image" width={400} height={225} />
			</div>

			{ new Date(article.date) <= safeDate && 
				<div className="-mx-[5px] md:mx-4 md:mb-8">
					<AudioPlayer slug={articleSlug} defaultTime={article.readingTime * 60 * 1.4} />
				</div>
			}
			
		 <section id="blog" className="prose prose-lg dark:prose-invert dark:text-gray-50/75 prose-headings:font-mono prose-ul:pl-4 max-w-2xl mx-auto px-1 -mt-2 selection:bg-sky-300">
				{article?.content.map((block, index)=>{
					if (block.__component === 'page.editor') {
							return <div key={index} className="break-words" dangerouslySetInnerHTML={{__html: block.editor}}></div>
					}
					if (block.__component === 'page.book-excerpt') {
						return <Citation key={index} quote={block.text} cite={block.source} />
					}
				})}
			</section>
	 </article>
	)
}

function Author({author, date}) {
	if (!author) return null
	const profileImage = author?.image?.url ?? `https://ui-avatars.com/api/?name=${author?.firstName}+${author?.lastName}&background=7cd3fc&color=22222c`
	return (
		<div className="flex items-center py-4 mt-2 -ml-0.5 relative z-10" style={{ viewTransitionName: "author"}}>
			<Image style={{ viewTransitionName: "author-image"}} alt="avatar" className="object-cover object-center border-2 border-transparent rounded-full aspect-square h-10" height={40} width={40} src={profileImage} placeholder="empty" />
			<p className="leading-none mt-1 ml-2">
				<span className="uppercase font-semibold text-gray-700 dark:text-gray-300 opacity-95 relative z-20">{author.firstName} {author.lastName}</span> <br />
				<span className="text-sm font-medium text-gray-700 dark:text-gray-300 opacity-75 block">veröffentlicht am {new Date(date).toLocaleDateString("de-DE")}</span>
			</p>
		</div>
	)
}
