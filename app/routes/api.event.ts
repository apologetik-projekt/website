import { ActionFunctionArgs, json } from "@remix-run/cloudflare"

export async function action({ request, context }: ActionFunctionArgs) {
		const requeste = new Request(request)
		const response = await fetch('https://anna.apologetik-projekt.de/api/event', requeste).catch(e => {
			return json(e)
		})
		return response
}