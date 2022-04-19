import { EtherialResponse, SuccessfulResponse } from "~/types/frank"
import HttpStatusCode from "~/types/http_status_code"

// [vars]
const EMAIL_API_URL = 'https://frank-puce.vercel.app/api/email'

export default class FrankClient {
	private secret: string
	private email: string

	constructor(config) {
		this.secret = config.secret
		this.email = config.email
	}

	public async validateHuman(secret: string, token: string): Promise<boolean> {
		const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, { method: "POST"})
		const { success } = await response.json()
		return success
	}

	async sendMail(data): Promise<SuccessfulResponse | EtherialResponse>{
		const mail = await fetch(EMAIL_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Frank-Server-Token': this.secret
			},
			body: JSON.stringify({
				"From": data.email,
				"To": this.email,
				"Name": data.name,
				"Subject": "Nachricht vom Kontaktformular",
				"Text": data.message
			})
		})

		if (mail.status === HttpStatusCode.OK && this.secret.includes('test')) {
			const { messageId, url } = await mail.json()
			return { status: HttpStatusCode.OK, etherial: { messageId, url } }
		}

		return { status: mail.status }
	}
}

