import React, { HTMLAttributes, useRef, useState } from "react"
import { BASE_URL } from "../utils/constants"

export function getImageUrl(image: string, params: string) {
		if (!image.startsWith("https")) return image
		else return `https://images.weserv.nl/?url=${image}${params}&output=webp`
}

interface Props {
	className?: string,
	src: string,
	alt: string,
	width?: number,
	height?: number,
	loading?: 'lazy' | 'eager',
	placeholder?: string
}

export function Image({ src, alt, className, loading, width, height, placeholder, ...props }: Props) {
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

	const imageParams = width && height ? `&w=${width*2}&h=${height*2}&a=center` : ''

	return (
		<div className="overflow-hidden">
		<img
			onLoad={imageLoaded}
			src={getImageUrl(src ?? '', imageParams)}
			style={placeholder ? styles : undefined}
			alt={alt}
			ref={imageRef}
			height={height}
			width={width}
			className={className}
			loading={loading}
			{...props}
		/>
		</div>
	)
}