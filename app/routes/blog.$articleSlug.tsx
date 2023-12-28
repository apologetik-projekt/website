import { json } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import { Strapi } from "~/api/strapi"
import Citation from "~/components/citation"
import { BASE_URL } from "~/utils/constants"
import { Image } from "~/components/image"

export const meta = ({data, location}) => [{
	title: `${data.title} | Apologetik Projetkt`,
	description: data.description,
	site_name: 'Das Apologetik Projekt',
	'og:url': BASE_URL + location.pathname,
	'og:title': `${data.seo_title ?? data.title} | Apologetik Channel`,
	'og:description': data.description,
	'og:image': data.image?.url,
	'twitter:card': 'summary'
}]

export const links = () => [
  { rel: "stylesheet", href: "https://api.fonts.coollabs.io/css2?family=Noticia+Text&display=swap"},
]

export const loader = async ({ params, context }) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: article } = (await strapi.fetch(`slugify/slugs/article/${params.articleSlug}?populate=author.image,image,content`))
  return json(article)
}

export default function Article(){
	const article = useLoaderData<any>()

	return (	
		<article className="max-w-4xl mx-auto p-4 pb-10 w-full">
			<header className="max-w-2xl mx-auto">
				<h1 className="font-extrabold md:text-balance font-mono text-5xl md:text-7xl md:pt-2 relative z-30" style={{ viewTransitionName: "title"}}>{article?.title}</h1>
				<Author author={article?.author} date={article?.date} />	
			</header>

			<div className="my-3 -mx-4 md:m-4 md:mb-10" style={{ viewTransitionName: "image"}}>
				<Image 
					className="object-cover bg-black origin-center w-full aspect-video" 
					src={article?.image?.url}
					placeholder={article?.image?.placeholder}
					alt="Image" width={800} height={450} />
			</div>
			
		 <section id="blog" className="prose-lg prose-headings:font-mono max-w-2xl mx-auto px-1 -mt-1 selection:bg-sky-300">
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
			<Image style={{ viewTransitionName: "author-image"}} alt="avatar" className="object-cover object-center border-2 border-transparent rounded-full h-10 w-10 mr-2" height={40} width={40} src={profileImage} />
			<p className="leading-none mt-1">
				<span className="uppercase font-semibold text-gray-700 opacity-95 relative z-20">{author.firstName} {author.lastName}</span> <br />
				<span className="text-sm font-medium text-gray-700 opacity-75 block">veröffentlicht am {new Date(date).toLocaleDateString()}</span>
			</p>
		</div>
	)
}
