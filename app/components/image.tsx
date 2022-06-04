import { BASE_URL, ENV } from "../utils/constants"

export function getImageUrl(image: string) {
		if (image.startsWith("http")) return image
		if (ENV == 'dev') return `http://127.0.0.1:1337${image}`
		else return `https://images.weserv.nl/?url=${BASE_URL}${image}`
}

export function Image({ src, alt, className, ...props }) {
	return (
		<img
			src={getImageUrl(src)}
			alt={alt}
			className={className}
			{...props}
		/>
	)
}