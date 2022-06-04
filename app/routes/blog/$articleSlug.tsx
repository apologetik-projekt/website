import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Citation from "~/components/citation"
import { BASE_URL } from "~/utils/constants"
import { Image } from "~/components/image"

export const meta: MetaFunction = ({data, location}) => ({
	title: `${data.title} | Apologetik Projetkt`,
	description: data.description,
	site_name: 'Das Apologetik Projekt',
	'og:url': BASE_URL + location.pathname,
	'og:title': `${data.seo_title ?? data.title} | Apologetik Channel`,
	'og:description': data.description,
	'og:image': data.image?.url,
	'twitter:card': 'summary'
})

export const loader: LoaderFunction = async ({ params, context }) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: article } = (await strapi.fetch(`slugify/slugs/article/${params.articleSlug}?populate=*`))
  return json(article)
}

export default function Article(){
	const article = useLoaderData()

	return (	
		<article className="max-w-4xl mx-auto p-4 pb-10">
			<header className="max-w-2xl mx-auto px-1">
				<h1 className="font-extrabold font-mono text-5xl md:text-7xl pt-2">{article?.title}</h1>
				<Author author={article?.author} date={article?.date} />	
			</header>

			<div className="my-3 -mx-4 md:m-4 md:mb-10">
				<Image className="object-cover bg-black origin-center w-full" src={article?.image.url} alt="Image" width="836" height="400"/>
			</div>
			
		 <section id="blog" className="prose-lg max-w-2xl mx-auto px-1 -mt-1">
				{article?.content.map((block, index)=>{
					if (block.__component === 'page.editor') {
							return <div key={index} className="break-words" dangerouslySetInnerHTML={{__html: block.editor}}></div>
					}
					if (block.__component === 'page.book-excerpt') {
						return <Citation quote={block.text} cite={block.source} />
					}
				})}
			</section>
	 </article>
	)
}

function Author({author, date}) {
	if (!author) return null
	const profileImage = author?.profile_image?.url ?? `https://cdn.statically.io/avatar/shape=circle/${author?.firstName.charAt(0)}${author?.lastName.charAt(0) || author?.lastName.charAt(1)}_B`
	return (
		<div className="flex items-center py-4 mt-2 -ml-0.5">
			<Image alt="avatar" className="object-cover object-center border-2 border-transparent rounded-full h-10 w-10 mr-2" height="28px" width="28px" src={profileImage} />
			<p className="leading-none mt-1">
				<span className="uppercase font-semibold text-gray-700 opacity-95">{author.firstName} {author.lastName}</span> <br />
				<span className="text-sm font-medium text-gray-700 opacity-75 block">veröffentlicht am {date}</span>
			</p>
		</div>
	)
}
