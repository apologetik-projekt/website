import { json } from "@remix-run/cloudflare"
import HttpStatusCode from "~/types/http_status_code"
import { KirbyQuery, KirbyResponse, PageData } from "~/types/kirby"
import { StrapiResponse } from "~/types/strapi"
import { HTTPClient } from "./http-client"

export class Strapi extends HTTPClient{
	constructor(base_url: string, auth_token: string) {
		super({base_url, auth_token})
	}

	public async fetch(query: string): Promise<StrapiResponse> {
		return await this.client.get(query).json() as StrapiResponse
	}

	// public async getPage(slug: string): Promise<PageData> {
	// 	const res = await this.client.get(`pages/${slug}`).json() as KirbyResponse
	// 	return res.data
	// }

	// public async getNavigation() {
	// 	const res: any = await this.fetchKQL({
	// 		query: "site.pages.notTemplate('video').listed",
	// 		select: {
	// 			title: true,
	// 			slug: "page.slug",
	// 			isHomePage: true,
	// 			hasChildren: true,
	// 			children: {
	// 				query: "page.children.not(kirby.collection('blog-posts'))",
	// 				select: { title: true, slug: "page.uri" }
	// 			}
	// 		}
	// 	}).then(res => {
	// 		return res.data
	// 	}).catch(err => {
	// 		console.error(err)
	// 		throw json("Service Unavailable", { status: HttpStatusCode.SERVICE_UNAVAILABLE, statusText: 'CMS nicht erreichbar!'})
	// 	})
		
	// 	return res?.map(page => ({
	// 		...page,
	// 		hasChildren: page.children.length > 0,
	// 		slug: page.slug == 'home' ? '' : page.slug,
	// 	}))
	// }
}
