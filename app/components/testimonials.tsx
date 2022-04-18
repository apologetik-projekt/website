import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

//TODO: Cleanup
export default function Testimonials({quotes}){
	return (
		<div className="flex flex-col justify-center items-center space-y-10 md:space-y-0 md:space-x-6 bg-yellow-300 md:flex-row bg-opacity-60 px-5 py-12 md:p-8 md:pt-7 mt-6 -mx-4 md:-mx-8">
			<Quotes quotes={quotes} />
			<Socials />
		</div>
	)
}

function Quotes({quotes}){
	const [items, setItems] = useState(quotes.reverse())

	function handleClick(){
		setItems(items.slice(1).concat(items[0]))
	} 
	return (
		<section className="relative">
			<div className="grid stack w-80" style={{paddingTop: items.length*7-9}}>
				<AnimatePresence>
				{items.slice(0,5).map((quote, index)=>(
					<motion.div 
						key={quote.name} 
						layoutId={quote.name}
						initial={{ opacity: 1, x: index*(24-(index)*2) , y:index*-(10-(index)/1.2) }}
						animate={{opacity: 1, x: index*(24-(index)*2), y: index*-(10-(index)/1.2), transition: { ease: 'easeOut'}}}
						exit={{opacity: 0, x: 12, y: -4, transition: {duration: 0.1} }}
						style={{ filter: "drop-shadow(0 1px 5px rgba(0, 0, 0, 0.06))", backdropFilter: "blur(2.5px) contrast(1.05)", zIndex: items.length - index, opacity: (index == 0) ? 1 : 0.5}} 
						className="bg-white bg-opacity-90 text-lg p-4 px-3 md:px-4 w-64 aspect-square">
							<svg width="45" height="36" className="fill-current md:-ml-1 text-yellow-400 opacity-40"><path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path></svg>
							<div className="mt-2 px-0.5" style={{opacity: (index == 0) ? 1 : 0.2}}>
								<h3 className="font-extrabold">{quote.name}</h3>
								<div className="font-medium text-gray-900 text-opacity-80" dangerouslySetInnerHTML={{__html: quote.text}}></div>
							</div>
					</motion.div>
				))}
				</AnimatePresence>
			</div>
			<button className="float-right no-tap mr-4 block bottom-0 right-0 absolute z-30 bg-yellow-600 bg-opacity-50 hover:bg-opacity-40 rounded-full h-10 w-10 active:bg-opacity-60" onClick={handleClick} style={{marginTop: items.length*5 + 4}}>
				<svg className="text-gray-700 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
			</button>
		</section>
	)
}


function Socials(){
	const items = [
		{
			title: "Instagram",
			size: 17,
			svg: <path fill="mediumvioletred" d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
		},
		{ 
			title: "Youtube",
			size: 19,
			svg: <path fill="red" d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z"/>
		},
		{ 
			title: "TikTok",
			size: 19,
			svg:	<path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z"/>
		}
	]
	return (
		<div className="w-full md:w-82 px-5 py-7 md:py-6">
			<h2 className="text-3xl font-extrabold mb-3 leading-7">Werde Teil der Community</h2>
			<p className="leading-snug">Folge unserem Channel auf Instagram, Youtube oder TikTok.</p>
			<div className="mt-4 flex flex-col space-y-1 font-normal">
				{items.map((item)=>(
					<a href="instagram.com" className="font-medium text-lg text-gray-800 hover:text-black">
						<span className="w-24 flex items-center">
							<svg className="mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">{item.svg}</svg>
							{item.title}
						</span>
					</a>
				))}
			</div>
		</div>
	)
}