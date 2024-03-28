import React, { Children } from "react"
import { useMediaQuery } from "~/utils/use-media-query"

interface Props {
	mediaQuery?: string
	className?: string
	rowClassName?: string
}

export function Masonry(props: React.PropsWithChildren<Props>) {
	const [isDesktop] = useMediaQuery(props.mediaQuery ?? "only screen and (min-width: 768px)", { fallback: true })
	const items = Children.toArray(props.children)
	
	if (isDesktop) {
		items.splice(0, 1)
		return (
			<section className={["flex flex-col md:flex-row", props.className].join(" ")}>
				<div className={["flex flex-col flex-1", props.rowClassName].join(" ")}>
					{ items.filter((_, i) => i % 2 === 0).map(item => item) }
				</div>
				<div className={["flex flex-col flex-1", props.rowClassName].join(" ")}>
					{ items.filter((_, i) => i % 2 !== 0).map(item => item) }
				</div>
			</section>
		)
	}

	return (
		<section className={["md:hidden", props.className].join(" ")}>
			<div className={["flex flex-col", props.rowClassName].join(" ")}>
				{props.children}
			</div>
		</section>
	)
}