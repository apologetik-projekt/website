import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Kirby } from "~/api/kirby"
import Citation from "~/components/citation"
import { BASE_URL } from "~/utils/constants"

export const meta: MetaFunction = ({data, location}) => ({
	title: `${data.seo_title ?? data.title} | Apologetik Projetkt`,
	description: data.description,
	site_name: 'Das Apologetik Projekt',
	'og:url': BASE_URL + location.pathname,
	'og:title': `${data.seo_title ?? data.title} | Apologetik Channel`,
	'og:description': data.description,
	'og:image': data.image?.url,
	'twitter:card': 'summary'
})

export const loader: LoaderFunction = async ({ params, context }) => {
	const id = params.articleSlug
	const kirby = new Kirby(context.env.KIRBY_API_URL, context.env.KIRBY_AUTH_TOKEN)
  const article = await kirby.fetchKQL({
			"query": `page('blog\/${id}')`,
			"select": {
				"title": true,
				"author": true,
				"date": "page.date.toDate('d.m.Y')",
				"image": true,
				"tags": true,
				"uri": true,
				"blocks": "page.content.blocks.toBlocks",
				"seo_title": true,
				"description": true
			}
	})

  return json(article)
}

export default function Article(){
	const article = useLoaderData()
	return (	
		<article className="max-w-4xl mx-auto p-4 pb-10">
			<header className="max-w-2xl mx-auto px-1">
				<h1 className="font-extrabold text-5xl md:text-7xl pt-2">{article?.title}</h1>
				<div className="flex items-center py-4 mt-2 -ml-0.5">
					<img className="object-cover border-2 border-transparent rounded-full h-10 w-10 mr-2" height="28px" width="28px" src="https://images.unsplash.com/photo-1531750026848-8ada78f641c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80" />
					<p className="leading-none mt-1">
						<span className="uppercase font-semibold text-gray-700 opacity-95">{article?.author}</span> <br />
						<span className="text-sm font-medium text-gray-700 opacity-75 block">veröffentlicht am {article?.date}</span>
					</p>
				</div>
				
			</header>

	<div className="my-3 -mx-4 md:m-4 md:mb-10">
		<img className="object-cover bg-black origin-center w-full" src={article.image ? article.image.url : "http:\/\/apologetik.test\/media\/pages\/blog\/ich-glaube-nicht-an-gott-leid\/ec8d2679ea-1626271043\/jonathan-rados-sbxt82csmxa-unsplash.jpg"} alt="Image" width="836" height="400"/>
	</div>
			
		<section id="blog" className="prose-lg max-w-2xl mx-auto px-1 -mt-1">
				{article?.blocks.map((block, index)=>{
					if (block.type === "text") return (
						<div key={index} className="break-words" dangerouslySetInnerHTML={{__html: block.content.text}}></div>
					)
					if (block.type == 'heading') {
						const Heading = block.content.level
						return (<div key={index} className="relative z-10"><Heading><span dangerouslySetInnerHTML={{__html: block.content.text}}></span></Heading></div>)
					}
					if (block.type == 'quote') {
						return (<blockquote className="border-l-4 border-gray-800 py-0.5 pb-1 !my-10 !mb-12">
							<div className="font-medium italic leading-7 text-xl" dangerouslySetInnerHTML={{__html: block.content.text}}></div>
							{ block.content.citation && <cite className="opacity-70 block mt-2 text-base not-italic"> - {block.content.citation}</cite>}
						</blockquote>)
					}
					if (block.type == 'citation') {
						return <Citation quote={block.content.text} cite={block.content.cite} />
					}
				})}
			</section>
	 </article>
	)
}

