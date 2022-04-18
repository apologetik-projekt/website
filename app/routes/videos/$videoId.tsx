import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import type { Video } from "~/types/video"
import { Kirby } from "~/api/kirby"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import ytStyles from '~/styles/yt-lite.css'

export const handle = {
	header: 'dark'
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: ytStyles },
]

export const meta = ({data}: {data: Video}) => {
	const imageUrl = data.image.replace('default', 'maxresdefault')
	return {
		title: data.title,
		description: data.description.substring(0, 154)+'...',
		"og:image": imageUrl,
		"twitter:image": imageUrl,
		"twitter:card": data.description,
	}
}


export let loader : LoaderFunction = async ({params, context}) => {
		const id = params.videoId
		const kirby = new Kirby(context.env.KIRBY_API_URL, context.env.KIRBY_AUTH_TOKEN)
		const video: any = await kirby.fetchKQL({
				"query": `page('videos\/${id}')`,
				"select": {
					"image": "page.content.image",
					"id": "page.content.id",
					"title": "page.content.title",
					"description": "page.content.description"
				}
		})
		return video as Video
}

export default function Article(){
	const video = useLoaderData()
	return (	
		<article className="-mb-10 -mt-24">
			<header className="bg-gray-900 pt-24">
				<div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
					<LiteYouTubeEmbed 
						id={video?.id}
						title={video?.title}
						noCookie={true}
					/>
					<h1 className="text-white font-bold text-4xl mt-8">{video?.title}</h1>
				</div>

				<section className="prose-lg text-gray-400 max-w-3xl px-4 md:px-8 mx-auto pb-12">
					<p>{video?.description}</p>
				</section>
			</header>				
		</article>
	)
}
