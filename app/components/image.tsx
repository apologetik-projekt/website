import React, { HTMLAttributes } from "react"
import { BASE_URL, ENV } from "../utils/constants"

export function getImageUrl(image: string) {
		if (image.startsWith("http")) return image
		if (ENV == 'dev') return `http://127.0.0.1:1337${image}`
		else return `https://images.weserv.nl/?url=${BASE_URL}${image}`
}

interface Props {
	className?: string,
	src: string,
	alt: string,
	width?: number | string,
	height?: number | string,
	loading?: 'lazy' | 'eager',
}

export function Image({ src, alt, className, loading, ...props }: Props) {
	return (
		<img
			src={getImageUrl(src)}
			alt={alt}
			height={props.height}
			width={props.width}
			className={className}
			loading={loading}
			{...props}
		/>
	)
}