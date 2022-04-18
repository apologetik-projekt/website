import ky from "ky"
import { json } from "@remix-run/cloudflare"
import type { KyInstance } from "ky/distribution/types/ky"

export class HTTPClient {
	public client: KyInstance
	constructor(config) {
		this.client = ky.extend({
			prefixUrl: config.base_url,
			credentials: undefined,
			hooks: {
				beforeRequest: [
					request => {
						request.headers.set('Authorization', `Basic ${config.auth_token}`)
					}
				],
				afterResponse: [
					async (request, options, response) => {
						if (!response.ok) {
							switch(response.status) {
								case 403:
									const statusText = "Your Token is invalid or expired"
									throw json(statusText, { status: 403, statusText })
								case 404:
									const { query } = await request.json()
									if (query.includes('site.pages')) { 
										const statusText = "CMS nicht erreichbar!"
										throw json(statusText, { status: 503, statusText: statusText })
									}
									throw json("Not Found", { status: 404 })
								default: 
									throw json("An error occurred", { status: response.status, statusText: response.statusText })
							}
						}
					}
				]
			}
		})
	}
}