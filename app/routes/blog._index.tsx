import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { Link, NavLink, unstable_useViewTransitionState, useLoaderData } from '@remix-run/react'
import { Strapi } from "~/api/strapi"
import { Image } from "~/components/image"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useMediaQuery } from "~/utils/use-media-query"
import { Masonry } from "~/components/masonry"


export const meta: MetaFunction = () => {
	return [{ title: "Apologetik Projekt - Blog" }]
}

export const loader = async ({ context }) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: articles } = await strapi.fetch('articles?populate[0]=image&populate[1]=author.image&fields[0]=title&fields[1]=slug&fields[2]=description&sort[0]=date%3Adesc')

	return json(articles)
}

const fallBackImage = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
export default function Blog() {
	const articles = useLoaderData() as any as any[]
	

	const latestArticle = articles[0]

	return (
		<>
			{/* <section id="latestArticle" className="bg-opacity-90 w-full -mt-28 pt-8" style={{backgroundImage: 'url(/bg_paper_light.webp)'}}>
				<div className="max-w-4xl mx-auto mt-20 md:mt-8 md:bg-white md:shadow-lg rounded-px md:translate-y-14">
					<div className="flex flex-col md:flex-row mb-4">
							<div id="article_thumbnail" className="md:w-5/12 flex-shrink-0 p-5">
								<Image
									alt={latestArticle.image?.alternativeText || ""}
									height={400} width={400}
									className="aspect-[4/3] md:aspect-square bg-black object-cover w-full shadow-sm rounded-px" 
									placeholder={latestArticle.image?.placeholder}
									src={latestArticle.image?.url ?? fallBackImage} />
							</div>

							<div id="article_text" className="md:w-7/12 pt-2 md:pt-8 px-5 md:px-3 pb-8" style={{ flexBasis: "100%" }}>
								<h2 className="font-extrabold font-mono leading-none text-5xl tracking-tighter">
									<Link to={`/blog/${latestArticle.slug}`}>{latestArticle.title}</Link>
								</h2>
								<div className="my-4 flex items-center">
									<Image 
										className="rounded-full overflow-hidden mr-2 bg-blue-400"
										src={latestArticle.author?.image?.url} alt="Avatar" aria-hidden width={24} height={24} />
									<span className="text-gray-800 leading-relaxed">{latestArticle.author.firstName} {latestArticle.author.lastName}</span>
								</div>
								<p className="text-gray-900 leading-snug text-lg mr-1">
									{latestArticle.description}
								</p>
							</div>
					</div>
				</div>
			</section> */}
			<main className="max-w-5xl mx-auto px-4 md:px-2 mt-8 pb-10 w-full">
				<Masonry className="md:gap-x-4 lg:gap-x-16" rowClassName="gap-y-6 md:gap-y-8">
						{
							articles.map((article, index) => (
								<Article key={index} article={article} />
							))
						}
				</Masonry>
			</main>
		</>
	)
}

function Article({article}) {
	const isTransitioning = unstable_useViewTransitionState(article.slug)

	function getViewTransitionName(name: string) {
		return isTransitioning ? name : undefined
	}

	return (
		<Link key={article.slug} to={article.slug} className="group hover:opacity-90 duration-200 flex flex-col" unstable_viewTransition>
				<div className="">
					<Image 
						style={{ viewTransitionName: getViewTransitionName("image")}}
						alt={article.title}
						className="object-cover aspect-[27.5/17] w-full" 
						src={article.image.url ?? fallBackImage} 
						placeholder={article.image?.placeholder}
						width={300} height={166} />
						<div className="p-2 h-12 flex items-center -mt-12">
							<div className="flex items-center px-2 py-1 rounded-full backdrop-blur-md bg-black/40" style={{ viewTransitionName: getViewTransitionName("author"), width: "max-content"}}>
								<div className="-translate-x-[3px]">
									<Image 
										style={{ viewTransitionName: getViewTransitionName("author-image") }}
										className="rounded-full overflow-hidden bg-blue-400"
										src={article.author?.image?.url} alt="Avatar" aria-hidden width={22} height={22} />
								</div>
								<span className="text-white/90 text-sm font-light leading-snug mx-1.5 mr-1 tabular-nums">
									<span className="leading-relaxed">{article.author.firstName} {article.author.lastName}</span> • {Math.ceil(Math.random()*10)}&#x200A;min
								</span>
							</div>
						</div>
				</div>
				<div className="">
					<h3 className="font-bold md:text-balance break-words hyphens-auto text-black font-mono leading-super-tight tracking-tight text-[2.5rem] mt-4 md:py-1 mb-2.5 group-hover:underline" style={{ viewTransitionName: isTransitioning ? "title": undefined}}>{article.title}</h3>
					<p className="text-gray-750 font-light mb-4">
						{article.description}
					</p>
				</div>
		</Link>
	)
}


