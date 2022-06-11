import React, { HTMLAttributes, useRef, useState } from "react"
import { BASE_URL, ENV } from "../utils/constants"

export function getImageUrl(image: string, params) {
		if (!image.startsWith("https") || ENV == 'dev') return image
		else return `https://images.weserv.nl/?url=${image}${params}`
}

interface Props {
	className?: string,
	src: string,
	alt: string,
	width?: number | string,
	height?: number | string,
	loading?: 'lazy' | 'eager',
	placeholder?: string
}

export function Image({ src, alt, className, loading, placeholder, ...props }: Props) {
	const styles: React.CSSProperties | undefined = placeholder ? {
		backgroundImage: `url(${placeholder})`,
		backgroundSize: 'contain',
		//filter: 'blur(10px)',
		overflow: 'hidden',
		transition: 'filter',
		transitionDuration: '0.2s',
	} : undefined
	
	const imageRef = useRef<HTMLImageElement>(null)
	function imageLoaded() {
		if (imageRef.current != null) {
			imageRef.current.style.filter = 'blur(0px)'
			imageRef.current.style.backgroundImage = ''
		}
	}
	
	const imageParams = `&w=${props.width}&h=${props.height}`

	return (
		<div className="overflow-hidden">
		<img
			onLoad={imageLoaded}
			src={getImageUrl(src ?? '', imageParams)}
			style={placeholder ? styles : undefined}
			alt={alt}
			ref={imageRef}
			height={props.height}
			width={props.width}
			className={className}
			loading={loading}
			{...props}
		/>
		</div>
	)
}