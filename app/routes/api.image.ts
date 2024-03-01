import { type LoaderFunction } from "@remix-run/cloudflare";
import { imageLoader, LoaderConfig, MemoryCache } from "remix-image/serverPure";

export const loader: LoaderFunction = async ({ request }) => {
	const config: LoaderConfig = {
		selfUrl: "http://"+request.headers.get("host") ?? "localhost:8788",
		cache: new MemoryCache(),
	}
	const response = await imageLoader(config, request)

  return new Response(response.body, { 
		headers: {
			...response.headers,
			"Cache-Control": "max-age=3600, s-max-age=86400, max-stale=31536000",
		},
		status: response.status,
		statusText: response.statusText
	})
}