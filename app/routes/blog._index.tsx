import { json, MetaFunction } from "@remix-run/cloudflare"
import { Link, unstable_useViewTransitionState, useLoaderData } from '@remix-run/react'
import { Strapi } from "~/api/strapi"
import { Image } from "~/components/image"
import { useMediaQuery } from "~/utils/use-media-query"
import { Masonry } from "~/components/masonry"


export const meta: MetaFunction = () => {
	return [{ title: "Apologetik Projekt - Blog" }]
}

export const loader = async ({ context }) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: articles } = await strapi.fetch('articles?populate[0]=image&populate[1]=author.image&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=readingTime&sort[0]=date%3Adesc')
	return json(articles)
}

const fallBackImage = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
export default function Blog() {
	const articles = useLoaderData() as any as any[]
	const latestArticle = articles[0]
	const isTransitioning = unstable_useViewTransitionState(latestArticle.slug)
	const [isDesktop] = useMediaQuery("only screen and (min-width: 768px)", { fallback: true })
	const viewTransitionName = (isTransitioning && !isDesktop) ? "title" : undefined

	return (
		<>
			<section className="w-full bg-cover bg-[center_top_33%] text-black dark:text-white -mt-24" style={{ backgroundImage: `url(${latestArticle.image.url})` }}>
				<div className="pt-20 pb-8 md:pt-28 md:pb-16 bg-gradient-to-b from-[#ffe16cbf] dark:from-[#5b4b0cd6] to-gray-50 dark:to-gray-900 bg-blend-hard-light saturate-75">
					<div className="max-w-5xl mx-auto mt-16 px-4 md:px-1">	
						<div className="select-none text-sm mb-1 text-black/80 dark:text-gray-100/80 flex items-center gap-1">
							<svg width="9" height="14" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.5 5H8L3.5 11.5V7H0L4.5 0.5V5Z" fill="currentColor"/>
							</svg>
							<span className="uppercase leading-tight font-bold">Neuster Artikel</span>
								<span className="text-sm leading-snug">
									<span className="leading-relaxed">- {latestArticle.author.firstName} {latestArticle.author.lastName}</span> <span className="opacity-75">•</span> {latestArticle.readingTime ? Math.ceil(latestArticle.readingTime) : "?"}&#x200A;min
								</span>
						</div>
						
						<Link prefetch="intent" to={latestArticle.slug} className="hover:underline" unstable_viewTransition>
							<h2 style={{ viewTransitionName, animationDuration: isDesktop ? "0s !important" : "auto" }} className="font-extrabold text-5xl font-mono mb-4 relative z-30">{latestArticle.title}</h2>
						</Link>
						<p className="max-w-4xl text-pretty text-opacity-85 font-normal">{latestArticle.description}</p>
						
					</div>
				</div>
			</section>
			<main className="max-w-5xl mx-auto px-4 md:px-2 mt-8 pb-10 w-full">
				<Masonry className="md:gap-x-4 lg:gap-x-16" rowClassName="gap-y-6 md:gap-y-8">
						{
							articles.filter((_, i) => i != 0).map((article, index) => (
								<Article key={index} article={article} />
							))
						}
				</Masonry>
			</main>
		</>
	)
}

function Article({article}) {
	const readingTime = article.readingTime ? Math.ceil(article.readingTime) : null
	const isTransitioning = unstable_useViewTransitionState(article.slug)

	function getViewTransitionName(name: string) {
		return isTransitioning ? name : undefined
	}

	return (
		<Link prefetch="intent" key={article.slug} to={article.slug} className="group hover:opacity-90 duration-200 flex flex-col" unstable_viewTransition>
				<div className="">
					<Image
						style={{ viewTransitionName: getViewTransitionName("image")}}
						alt={article.title}
						className="object-cover aspect-[27.5/17] w-full"
						src={article.image.url ?? fallBackImage} 
						blurDataURL={article.image?.placeholder}
						loading="lazy"
						width={300} height={166} />
						<div className="p-2 h-12 flex items-center -mt-12">
							<div className="flex items-center px-2 py-1 rounded-full backdrop-blur-md bg-black/40" style={{ viewTransitionName: getViewTransitionName("author"), width: "max-content"}}>
								<div className="-translate-x-[3px]">
									<Image
										style={{ viewTransitionName: getViewTransitionName("author-image") }}
										className="rounded-full overflow-hidden bg-blue-400 aspect-square h-6 w-6"
										src={article.author?.image?.url} alt="Avatar" aria-hidden width={22} height={22} />
								</div>
								<span className="text-white/90 text-sm font-light leading-snug mx-1.5 mr-1 tabular-nums">
									<span className="leading-relaxed">{article.author.firstName} {article.author.lastName}</span> 
									{readingTime ? <span> • {readingTime}&#x200A;min</span> : null}
								</span>
							</div>
						</div>
				</div>
				<div className="text-black dark:text-white">
					<h3 className="font-bold md:text-balance hyphens font-mono leading-super-tight tracking-tight text-[2.5rem] mt-4 md:py-1 mb-2.5 group-hover:underline" style={{ viewTransitionName: isTransitioning ? "title": undefined}}>{article.title}</h3>
					<p className="text-gray-600 dark:text-gray-400 font-normal mb-4">
						{article.description}
					</p>
				</div>
		</Link>
	)
}


