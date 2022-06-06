import { motion } from "framer-motion"

export default function ({ children }) {
	return (
		<motion.div
			className="grow"
			variants={animations}
			initial="initial"
			animate="enter"
			exit="exit">
			{children}
		</motion.div>
	)
}

const animations = {
	initial: {
		opacity: 0,
		y: 13,
		transition: { ease: 'easeIn' }
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: { ease: 'easeInOut' }
	},
	exit: {
		opacity: 0,
		y: 0,
		transition: { 
			duration: 0.01,
			delay: 0, 
			ease: 'easeIn'
		}
	},
}