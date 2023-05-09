import ky from "ky"
import { json } from "@remix-run/cloudflare"
import type { KyInstance } from "ky/distribution/types/ky"
import HttpStatusCode from "~/types/http_status_code"
import { ENV } from "~/utils/constants"

export class HTTPClient {
	public client: KyInstance
	//private credentials = { credentials: undefined }
	constructor(config) {
		this.client = ky.extend({
			prefixUrl: config.base_url,
			credentials: undefined,
			hooks: {
				beforeRequest: [
					request => {
						request.headers.set(
							'Authorization', `Bearer ${config.auth_token}`
						)
					}
				],
				afterResponse: [
					async (request, options, response) => {
						if (!response.ok) {
							switch(response.status) {
								case HttpStatusCode.FORBIDDEN:
									const statusText = "Your Token is invalid or expired"
									throw json(statusText, { status: HttpStatusCode.FORBIDDEN, statusText })
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