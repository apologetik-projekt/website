import { type LoaderFunction } from "@remix-run/cloudflare";
import { imageLoader, MemoryCache } from "remix-image/serverPure";

export const loader: LoaderFunction = ({ request }) => {
	const clonedRequest = new Request(request)
	const config = {
		selfUrl: "http://"+clonedRequest.headers.get("host") ?? "localhost:8788",
		cache: new MemoryCache(),
	}
  return imageLoader(config, clonedRequest)
}