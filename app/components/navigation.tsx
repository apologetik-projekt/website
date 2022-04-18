import { NavLink, Link } from '@remix-run/react'

interface Props {
	navigation: any,
	background?: "light" | "dark"
}

export default function Navigation({background = "light", navigation}: Props) {
	const activeStyles = `bg-gray-300 ${background == 'dark' ? 'bg-opacity-10' : 'bg-opacity-70'}`

	return(
		<nav className={`w-full relative z-10 max-w-5xl mx-auto py-6 px-4 sm:px-5 md:pl-7 lg:px-0 flex justify-between items-center ${background == 'dark' ? 'text-gray-100' : ''}`}>
			<Link to="/" className="font-sans leading-none font-black tracking-wide text-xl ml-1">APOLOGETIK <br/> PROJEKT</Link>
			<ul className="hidden md:flex space-x-2 leading-none items-start font-medium uppercase text-nav #text-gray-200">
				{navigation.map((item)=>(
						<li key={item.slug || 'home'}  className="group relative leading-none">
							<NavLink to={`/${item.slug}`} className={item.hasChildren ? 'active:pointer-events-none': undefined}>{({isActive}) => (
								<>
									<span className={`px-3 py-2 rounded-sm ${background == 'dark' ? 'hover:bg-gray-300' : 'hover:bg-gray-800' } hover:bg-opacity-10 ${item.hasChildren ? "hover:cursor-menu" : "hover:cursor-pointer"}  whitespace-nowrap ${isActive ? activeStyles : null}`}>
										{item.title}
									</span>
									{(item.children?.length !== undefined && item.hasChildren) && 
										<div className="hidden group-hover:block absolute top-4 left-0 normal-case text-gray-700 mt-0.5 whitespace-nowrap" style={{filter: "drop-shadow(0 -2px 5px rgb(0 0 0 / 10%))"}}>
										<div className="h-2 w-2 absolute top-3 left-3 bg-white shadow transform rotate-45 z-0"></div>
										<ul className="p-0.5 z-10 relative bg-white text-gray-800 rounded mt-4 active:pointer-events-auto">
											{item.children.map((subitem)=>(
												<li key={subitem.slug}>
													<NavLink to={"/"+subitem.slug} 
														className={({isActive}) => 
															`${isActive ? "text-stroke-100 text-black hover:!text-black" : null} 
															px-3 block py-2 hover:bg-yellow-900/20 saturate-[20%] rounded-sm`}
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