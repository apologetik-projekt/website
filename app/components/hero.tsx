import { motion } from 'framer-motion'

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

export default ({heading}: {heading: string}) => (
	<header className="min-h-[90vh] md:min-h-[50vh] max-h-[100vh] w-full text-white overflow-hidden relative -mt-32 grid stack items-end">
			<div className="radial-gradient bg-center-topish bg-black min-h-[50vh] md:min-h-[50vh] max-h-[100vh] w-full h-full pt-32 pb-24 isolate items-stretch transition-colors">
				<div className="max-w-5xl pt-5 pb-0 md:pt-10 md:pb-12 mx-auto -mt-2 md:mt-2 px-4 sm:px-5 md:px-7 lg:px-0">
				<section className="flex flex-col md:flex-row-reverse justify-between space-x-2 md:pb-4">
					<motion.div variants={variants} initial="before" animate="after" className="my-2 md:mt-0 md:w-3/5 md:-ml-12">
						<img alt="Zwei Personen unterhalten sich" width="570" className="m-0 bg-orange-100 saturate-[115%]" height="360" loading="eager" src="https://beta.apologetik-projekt.de/_next/image?url=%2Fconversation.jpg&w=640&q=75"/>
					</motion.div>
					<motion.div variants={textVariant} initial="hidden" animate="show" className="-mt-6 sm:mt-8 md:w-3/5 md:min-w-[350px]">
						<div className="leading-7 drop-shadow-sm text-xl relative z-10" id="heading" dangerouslySetInnerHTML={{__html: heading}} ></div>
					</motion.div>
				</section>
				</div>
			</div>

			<svg id="bg-slash" className="z-10" preserveAspectRatio="none" width="100%" height="60px" viewBox="0 0 1000 50">
				<path width="100%" height="100%" d="M 0 50 L 1000 50 L 1000 20 L 0 50 Z" fill="#FFF" stroke="none"/>
			</svg>
		</header>
)