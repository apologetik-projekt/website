import { json } from "@remix-run/cloudflare"
import HttpStatusCode from "~/types/http_status_code"
import { KirbyQuery, KirbyResponse, PageData } from "~/types/kirby"
import { HTTPClient } from "./http-client"

export class Kirby extends HTTPClient{
	constructor(base_url: string, auth_token: string) {
		super({base_url, auth_token})
	}

	public async fetchKQL(query: unknown): Promise<KirbyResponse> {
		const res = await this.client.post('query', { json: query }).json() as KirbyQuery
		return res.result
	}

	public async getPage(slug: string): Promise<PageData> {
		const res = await this.client.get(`pages/${slug}`).json() as KirbyResponse
		return res.data
	}

	public async getNavigation() {
		const res: any = await this.fetchKQL({
			query: "site.pages.notTemplate('video').listed",
			select: {
				title: true,
				slug: "page.slug",
				isHomePage: true,
				hasChildren: true,
				children: {
					query: "page.children.not(kirby.collection('blog-posts'))",
					select: { title: true, slug: "page.uri" }
				}
			}
		}).then(res => res.data).catch(err => {
			throw json("Service Unavailable", { status: HttpStatusCode.SERVICE_UNAVAILABLE, statusText: 'CMS nicht erreichbar!'})
		})
		return res?.map(page => ({
			...page,
			hasChildren: page.children.length > 0,
			slug: page.slug == 'home' ? '' : page.slug,
		}))
	}
}
