import { NavLink, Link } from '@remix-run/react'
import clsx from 'clsx'
import { NavigationItem } from '~/types/navigation'

interface Props {
	navigation: NavigationItem[],
	background?: "light" | "dark"
}

export default function Navigation({background = "light", navigation}: Props) {
	const activeStyles = `bg-gray-300 ${background == 'dark' ? 'bg-opacity-10' : 'bg-opacity-70'}`
	const hasDarkBackground = background == 'dark'

	function hasChildren(item: NavigationItem) {
		return item.items && item.items.length > 0
	}

	function getNavLink(item: NavigationItem) {
		if (item.slug == 'home') return '/'
		if (hasChildren(item)) return `/${item.items[0].slug}`
		return `/${item.slug}`
	}

	return(
		<nav className={`w-full font-mono relative z-10 max-w-5xl mx-auto py-6 px-4 sm:px-5 md:pl-7 lg:px-0 select-none flex justify-between items-center ${background == 'dark' ? 'text-gray-100' : ''}`}>
			<Link prefetch='render' to="/" className="md:translate-y-1.5 ml-1 no-tap active:sepia">
				<img height={30} width={84} className={clsx({invert: hasDarkBackground})} src="/logo.svg" alt="Apologetik Projekt - Logo" />
			</Link>
			<ul className="hidden md:flex space-x-2 leading-none items-start font-medium uppercase text-nav #text-gray-200">
				{navigation.map((item)=>(
						<li key={item.slug || 'home'}  className="group relative leading-none no-tap">
							<NavLink prefetch='intent' to={getNavLink(item)} className={hasChildren(item) ? 'active:pointer-events-none': undefined}>{({isActive}) => (
								<>
									<span className={clsx(
										'px-3 py-2 rounded-xs whitespace-nowrap', 
										hasDarkBackground && !hasChildren(item) ? 'hover:bg-gray-300' : 'hover:bg-gray-800', 
										hasChildren(item) ? "hover:cursor-menu hover:bg-opacity-0" : "hover:bg-opacity-10 hover:cursor-pointer",
										isActive && activeStyles
									)}>
										{item.title}
									</span>
									{hasChildren(item) && 
										<div className="hidden group-hover:block absolute top-4 left-0 normal-case text-gray-700 mt-0.5 whitespace-nowrap" style={{filter: "drop-shadow(0 -1px 4px rgb(10 10 6 / 8%))"}}>
										<div className="h-2 w-2 absolute top-3 left-3 bg-white shadow-sm transform rotate-45 z-0"></div>
										<ul className="p-0.5 z-10 relative bg-white font-sans text-gray-800 rounded-[1px] mt-4 active:pointer-events-auto">
											{item.items.map((subitem)=>(
												<li key={subitem.slug}>
													<NavLink to={"/"+subitem.uiRouterKey} 
														className={({isActive}) => 
															`${isActive ? "text-stroke-100 text-black hover:!text-black" : null} 
															px-3 block py-2 hover:bg-yellow-900/20 saturate-[20%] rounded-[1px]`}
														>
															{subitem.title}&nbsp;
													</NavLink>
												</li>
											))}
										</ul>
										</div>
									}
									</>
							)}
								</NavLink>
						</li>
				))}
			</ul>
		</nav>
	)
}