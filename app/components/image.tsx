import clsx from "clsx"
import { CSSProperties, useEffect, useRef, useState } from "react"
import { ImageProps, MimeType, Image as RemixImage } from "remix-image"

type Props = ImageProps & {
	src: string,
	width?: number,
	height?: number,
}

export function getAbsoluteImageUrl(image: string) {
	if (!image.startsWith("https")) return "http://127.0.0.1:1337"+image
	else if (image.includes(".webp")) return `https://images.weserv.nl/?url=${image}&output=jpg`
	else return image
}

export function getOptimizedImageUrl(image: string, params: string = "") {
	if (!image.startsWith("https")) return "http://127.0.0.1:1337"+image
	else return `https://images.weserv.nl/?url=${image}${params}&output=webp`
}


export function Image({ src, className, width, height, placeholder, style, options, ...props }: Props) {
	const shapeClasses = className?.split(" ").filter(c => c.includes("rounded") || c.includes("aspect")) ?? []
	const ref = useRef<HTMLImageElement>(null)
	const isInitiallyBlurred = !ref?.current?.complete == true && placeholder !== "empty"
	const [blurred, setBlurred] = useState(isInitiallyBlurred)
	const classes = clsx(className, blurred ? "blurred" : isInitiallyBlurred ? "unblurred" : undefined)

	return (
		<div className={clsx("overflow-hidden", ...shapeClasses)} style={{ viewTransitionName: style?.viewTransitionName }}>
			<RemixImage
				onLoad={() => console.log(ref?.current?.complete)}
				onLoadingComplete={() => setBlurred(false)}
				ref={ref}
				id="image"
				loaderUrl="https://assets.apologetik-projekt.de/image"
				src={getAbsoluteImageUrl(src)}
				responsive={[
					{
						size: { height, width: width ?? 1000 },
						maxWidth: 1440
					},
				]}
				options={{
					contentType: MimeType.WEBP,
					...options
				}}
				dprVariants={[1, 3]}
				className={classes}
				placeholder={placeholder ?? props.blurDataURL ? "blur" : undefined}
				style={{ ...style, viewTransitionName: undefined }}
				{...props}
				unoptimized={props.unoptimized as false | undefined} // weird type error
			/>
		</div>
	)
}