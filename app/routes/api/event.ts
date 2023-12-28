import { ActionFunctionArgs, json } from "@remix-run/cloudflare"

export async function action({ request, context }: ActionFunctionArgs) {
		const response = await fetch('https://anna.apologetik-projekt.de/api/event', request).catch(e => {
			return json(e)
		})
		return response
}