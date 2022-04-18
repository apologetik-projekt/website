import ky from "ky"
import { json } from "@remix-run/cloudflare"
import type { KyInstance } from "ky/distribution/types/ky"

export class HTTPClient {
	public client: KyInstance
	constructor(config) {
		this.client = ky.extend({
			prefixUrl: config.base_url,
			hooks: {
				beforeRequest: [
					request => {
						request.headers.set('Authorization', `Basic ${config.auth_token}`)
					}
				],
				afterResponse: [
					async (_, options, response) => {
						if (!response.ok) {
							switch(response.status) {
								case 403:
									throw json("Your token is invalid or expired", { status: 403 })
								case 404:
									throw json("Not Found", { status: 404 })
								default: 
									throw json("An error occurred", { status: response.status })
							}
						}
					}
				]
			}
		})
	}
}