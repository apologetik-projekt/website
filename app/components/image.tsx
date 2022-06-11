import React, { HTMLAttributes, useRef, useState } from "react"
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
	placeholder?: string
}

export function Image({ src = "", alt, className, loading, placeholder, ...props }: Props) {
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

	return (
		<div className="overflow-hidden">
		<img
			onLoad={imageLoaded}
			src={getImageUrl(src)}
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