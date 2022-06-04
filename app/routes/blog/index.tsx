import { json, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { Link, useLoaderData } from '@remix-run/react'
import { Strapi } from "~/api/strapi"
import { Image } from "~/components/image"
const BASE_URL = 'http://localhost:1337'

export const meta: MetaFunction = () => {
	return {
		title: "Apologetik Channel - Blog",
	}
}

export const loader: LoaderFunction = async ({context}) => {
	const strapi = new Strapi(context.env.STRAPI_API_URL, context.env.STRAPI_AUTH_TOKEN)
	const { data: articles } = await strapi.fetch('articles?populate[0]=image&fields[0]=title&fields[1]=slug&fields[2]=description')

	return json(articles)
}

export default function Blog() {
	const fallBackImage = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
	const articles = useLoaderData()

	const latestArticle = articles[0]

	return (
		<>
			<section id="latestArticle" className="bg-gray-200 bg-opacity-90 w-full -mt-24 pt-28 pb-5">
				<div className="max-w-4xl mx-auto pb-6 mt-4 px-4">
					<Link to={`/blog/${latestArticle.slug}`}>
						<a id="feature" className="flex flex-col md:flex-row mb-4">
							<div id="article_thumbnail" className="md:w-6/12 flex-shrink-0">
								<Image
									alt={latestArticle.image?.alternativeText || ""}
									className="aspect-16/9 bg-black object-cover shadow-sm" 
									src={latestArticle.image?.url ?? fallBackImage} />
							</div>

							<div id="article_text" className="md:w-6/12 mt-3 md:mt-0 px-0.5 md:pl-6" style={{ flexBasis: "100%" }}>
								<h2 className="font-extrabold font-mono leading-none text-5xl tracking-tighter">
									{latestArticle.title}
								</h2>
								<p className="text-gray-600 leading-snug text-lg mt-4" >{latestArticle.description}</p>
							</div>
						</a>
					</Link>
				</div>
			</section>
			<main className="max-w-4xl mx-auto px-4 mt-10 pb-10">
				<section className="grid grid-cols-1 gap-y-6 max-w-2xl">
					{
						articles.slice(1).map((article, index) => (
							<Link key={index} to={article.slug} className="hover:opacity-90 duration-200 flex flex-col md:flex-row">
								<div className="md:w-4/12 md:mr-4 flex-shrink-0">
									<Image alt={article.title} className="object-cover aspect-[16/11] w-full" src={article.image.url ?? fallBackImage} width={300} height={166} />
								</div>
								<div className="py-2 md:py-0.5 md:pt-0">
									<h3 className="font-bold text-black font-mono leading-7 tracking-tighter text-[1.55rem] mb-1.5">{article.title}</h3>
									<p className="text-gray-600">{article.description}</p>
								</div>
							</Link>
						))
					}
				</section>
			</main>
		</>
	)
}