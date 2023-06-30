import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { Link, useLoaderData } from '@remix-run/react'
import { Strapi } from "~/api/strapi"
import { Image } from "~/components/image"

export const meta: MetaFunction = () => {
	return {
		title: "Apologetik Projekt - Blog",
	}
}

export const loader: LoaderFunction = async ({context}) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: articles } = await strapi.fetch('articles?populate[0]=image&populate[1]=author.image&fields[0]=title&fields[1]=slug&fields[2]=description&sort[0]=date%3Adesc')

	return json(articles)
}

export default function Blog() {
	const fallBackImage = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
	const articles = useLoaderData()

	const latestArticle = articles[0]

	return (
		<>
			<section id="latestArticle" className="bg-opacity-90 w-full -mt-28 pt-8" style={{backgroundImage: 'url(/bg_paper_light.jpg)'}}>
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
								<Link to={`/blog/${latestArticle.slug}`} className="text-sky-700 font-medium mt-3 block hover:text-blue-800 cursor:pointer">Mehr lesen&#x2009;&rarr;</Link>
							</div>
					</div>
				</div>
			</section>
			<main className="max-w-4xl mx-auto px-5 mt-8 md:mt-32 pb-10">
				<section className="grid grid-cols-1 gap-y-6 max-w-2xl">
					{
						articles.slice(1).map((article, index) => (
							<Link key={index} to={article.slug} className="hover:opacity-90 duration-200 flex flex-col md:flex-row">
								<div className="md:w-4/12 md:mr-4 flex-shrink-0">
									<Image 
										alt={article.title} 
										className="object-cover aspect-[16/11] w-full" 
										src={article.image.url ?? fallBackImage} 
										placeholder={article.image?.placeholder}
										width={300} height={166} />
								</div>
								<div className="py-4 md:py-0.5 md:pt-0">
									<h3 className="font-bold text-black font-mono leading-7 tracking-tighter text-[1.55rem] mb-1.5">{article.title}</h3>
									<div className="my-1.5 flex items-center">
										<Image 
											className="rounded-full overflow-hidden mr-2 bg-blue-400"
											src={latestArticle.author?.image?.url} alt="Avatar" aria-hidden width={24} height={24} />
										<span className="text-gray-800 leading-relaxed">{latestArticle.author.firstName} {latestArticle.author.lastName}</span>
									</div>
									<p className="text-gray-600 relative">
										{article.description}
										<Link to={`/blog/${latestArticle.slug}`} className="absolute bottom-0 bg-gradient-to-r pl-28 pt-4 from-gray-100/0 via-[#FAFAFA] to-[#FAFAFA] right-0 z-10 text-sky-700 font-medium inline-block ml-1 hover:text-blue-800 cursor:pointer">Mehr lesen&#x2009;&rarr;</Link>
									</p>
								</div>
							</Link>
						))
					}
				</section>
			</main>
		</>
	)
}
