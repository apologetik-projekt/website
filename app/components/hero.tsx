import { motion } from 'framer-motion'
import { Image } from './image'
import { isbot } from 'isbot'

const variants = {
	before: {
		x: '40%',
		y: -20,
		opacity: 0,
		rotate: '0deg'
	},
	after: { x: '0%', rotate: '-2deg', opacity: 1, y: 2, transition: {duration: 0.6,type:"tween", ease: "easeOut"}}
}
const textVariant = {
	hidden: {
		y: 50,
		opacity: 0
	}, 
	show: {
		opacity: 1,
		y:0,
		transition: {
			duration: 0.7,
			type: "tween",
			ease: "easeOut"
		}
	}
}

interface Props {
	heading: string,
	image: any,
}

export default ({heading, image}: Props) => (
	<header style={{background: isbot(navigator.userAgent) ? '#161515' : 'url(/bg_paper_dark.webp), #161515'}} className="min-h-[90vh] font-mono md:min-h-[50vh] max-h-[100vh] w-full text-white overflow-hidden relative -mt-32 grid stack items-end">
			<div className="radial-gradient bg-center-topish  min-h-[50vh] md:min-h-[50vh] max-h-[100vh] w-full h-full pt-32 pb-24 isolate items-stretch transition-colors">
				<div className="max-w-5xl pt-5 pb-0 md:pt-10 md:pb-12 mx-auto -mt-2 md:mt-2 px-4 sm:px-5 md:px-7 lg:px-0">
				<section className="flex flex-col md:flex-row-reverse justify-between space-x-2 md:pb-4">
					<motion.div variants={variants} initial="before" animate="after" className="my-2 md:mt-0 md:w-3/5 md:-ml-12">
						<Image
							alt="Zwei Personen unterhalten sich" 
							width={300} height={220}
							className="m-0 bg-amber-500 saturate-[115%] w-full" 
							loading="eager"
							blurDataURL={image?.placeholder}
							src={image?.url}/>
					</motion.div>
					<motion.div variants={textVariant} id="heading" initial="hidden" animate="show" className="-mt-6 sm:mt-10 md:w-3/5 md:min-w-[350px]">
						<h1 className="leading-7 font-mono text-xl relative z-10">{heading}</h1>
					</motion.div>
				</section>
				</div>
			</div>

			<svg id="bg-slash" className="z-10" preserveAspectRatio="none" width="100%" height="60px" viewBox="0 0 1000 50">
				<path width="100%" height="100%" d="M 0 50 L 1000 50 L 1000 20 L 0 50 Z" fill="#fafafa" stroke="none"/>
			</svg>
		</header>
)