import { useEffect, useState } from "react"
import { NavLink, Link, useResolvedPath, useMatches } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import useStateMachine from "@cassiozen/usestatemachine"
import type { NavigationItem } from "~/types/navigation"

interface Props {
	navigation: NavigationItem[]
}

function hasChildren(item: NavigationItem) {
	return item.items && item.items.length > 0
}

export default function MobileNavigation({ navigation }: Props) {
	const [menuState, setMenuState] = useStateMachine({
		initial: 'closed',
		states: {
			open: {
				on: {
					CLOSE: 'closed',
					TRANSITION: 'transition'
				},
			},
			transition: {
				on: { CLOSE: 'closed' },
				effect({ send }) {
					setTimeout(() => send('CLOSE'), 930)
				},
			},
			closed: {
				on: { OPEN: 'open' }
			}
		},
	})

	const menuFrame = {
		open: {
			width: '100vw',
			height: '100vh',
			marginTop: 0,
			marginRight: 0,
			borderRadius: 0,
			transition: {
				duration: 0.5, type: "spring", ease: "easeInOut", bounceDamping: 6,
				borderRadius: { delay: 0, duration: 0.1 }
			}
		},
		closed: {
			width: '3.5rem',
			height: '3.5rem',
			marginTop: '1rem',
			marginRight: '1rem',
			borderRadius: '100%',
			transition: {
				duration: 0.2,
				borderRadius: { delay: 0.1, duration: 0.08 }
			}
		}
	}
	const menuList = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.075
			}
		}
	}

	const menuItem = {
		hidden: {
			opacity: 0, y: 30, x: 40
		},
		show: {
			opacity: 1, y: 0, x: 0,
			transition: {
				duration: 0.4, type: "tween", ease: "easeOut",
			}
		},
		exit: (delayedTransition) => ({
			opacity: 0, x: 40, y: 10, transition: { delay: delayedTransition ? 0.64 : 0, duration: delayedTransition ? 0.3 : 0.1 }
		})
	}

	function startTransition() {
		setMenuState('TRANSITION')
	}

	useEffect(() => {
		document.body.style.overflow = menuState.value == 'open' ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [menuState])

	return (
		<nav className="fixed z-50 right-0 md:!hidden">
			<motion.div
				variants={menuFrame}
				initial={false}
				animate={menuState.value === 'closed' ? 'closed' : 'open'}
				className="float-right font-mono text-gray-200 radial-gradient-solid">
				<motion.button
					onClick={() => { setMenuState(menuState.value === 'open' ? 'CLOSE' : 'OPEN') }}
					type="button"
					className="fixed rounded-full text-white clean-outline right-4 top-4 w-14 h-14 no-tap active:bg-gray-700">
					<span className="sr-only">Navigation öffnen</span>
					<svg width="24" height="24" fill="none" className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform scale-125">
						<path d={menuState.value !== 'closed' ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round" />
					</svg>
				</motion.button>
				<AnimatePresence custom={menuState.value == 'transition'}>
					{menuState.value === 'open' && <>
						<motion.ol
							variants={menuList}
							initial="hidden"
							exit="exit"
							animate="show" className="mt-10 p-4 px-8 text-6xl font-semibold space-y-3 flex flex-col mb-4">
							{navigation.map((item) => (
								<motion.li key={item.title} variants={menuItem}>
									{hasChildren(item)
										? <SubLinks onClick={startTransition} item={item} />
										: <NavLink to={`/${item.slug}`} onClick={startTransition} className={({ isActive }) => `${isActive ? "text-yellow-400 no-tap" : undefined} active:text-yellow-600 no-tap`}>{item.title}</NavLink>
									}
								</motion.li>
							))}
						</motion.ol>
						<motion.div exit={{ opacity: 0, transition: {duration: 0.2} }} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0, transition: { ease: "easeInOut", delay: 0.58, duration: 0.4 } }}>
							<a className="ml-6 mt-42 leading-tight bg-gray-500 bg-opacity-20 hover:bg-opacity-40 rounded px-5 py-3 font-mono font-medium text-gray-300 text-sm inline-flex items-center" href="https://instagram.com/derapologetikchannel/" target="_blank">
								<svg className="inline mr-2 -ml-0.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" /></svg>
								Instagram
							</a>
							<a className="ml-4 mt-42 leading-tight bg-gray-500 bg-opacity-20 hover:bg-opacity-40 rounded px-5 py-3 font-mono font-medium text-gray-300 text-sm inline-flex items-center" href="https://www.youtube.com/channel/UCE899ZLT0E2U91L4CXoBDig" target="_blank">
								<svg className="inline mr-2 -ml-0.5" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" /></svg>
								Youtube
							</a>
						</motion.div>
					</>}
				</AnimatePresence>
			</motion.div>


		</nav>
	)
}

function SubLinks({ item, onClick }: { item: NavigationItem, onClick: () => void }) {
	const matches = useMatches()
	const isParent = item.items.map((item) => item.uiRouterKey).some((item) => matches[1].params['*'] === item)
	
	const [collapsed, setCollapse] = useState(true)
	
	return (
		<div>
			<div onClick={() => setCollapse(!collapsed)} className="active:text-indigo-100 flex justify-between cursor-pointer items-center no-tap">
				<span className={isParent ? 'text-yellow-400' : undefined}>{item.title}</span>
				<svg className={`text-gray-200/80 transition duration-75 origin-center transform  ${!collapsed && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="square"><path d="M6 9l6 6 6-6" /></svg>
			</div>
			{
				!collapsed &&
				<ul className="px-1 mt-3 mb-8 space-y-2 font-medium text-gray-200/70">
					{item.items.map((item) => (
						<li key={item.slug} className="text-3xl">
							<NavLink to={item.uiRouterKey} className={({ isActive }) => isActive ? 'text-white' : ''} onClick={onClick}>{item.title}</NavLink>
						</li>
					))}
				</ul>
			}
		</div>
	)
}