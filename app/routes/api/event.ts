import { ActionArgs, json } from "@remix-run/cloudflare"

export async function action({ request, context }: ActionArgs) {
		const response = await fetch('https://anna.apologetik-projekt.de/api/event', request).catch(e => {
			return json(e)
		})
		return response
}