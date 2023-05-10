import { ActionArgs } from "@remix-run/cloudflare"

export async function action({ request, context }: ActionArgs) {
		const response = await fetch('https://anna.apologetik-projekt.de/api/event', request)
		return response
}