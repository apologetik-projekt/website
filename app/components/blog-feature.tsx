import { Link } from "@remix-run/react"

export function Card() {

	return (
		<a href="#" className="block max-w-xs bg-white rounded-lg shadow">
				<img className="rounded-t-lg aspect-video" src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				</div>
		</a>
	)
}

export function Cards() {
	return (
		<div className="relative p-12 bg-black md:mt-10 -mx-5 md:-mx-9 flex flex-col md:flex-row align-top gap-x-8 gap-y-16 items-center">
			<div className="grid stack px-1 py-4 md:w-[95%]">
			<div className="bg-white rounded-sm shadow -rotate-12 opacity-70">
				<div className="rounded-t-sm aspect-video bg-gradient-to-r from-yellow-400 via-ping-500 to-orange-400" />
				<div className="p-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900">Artikel 1</h5>
				</div>
			</div>
			<div className="bg-white rounded-sm shadow-lg rotate-3 opacity-80">
					<div className="rounded-t-sm aspect-video bg-gradient-to-r from-teal-500 from-10% via-sky-500 via-30% to-red-500 to-90%" />
					<div className="p-4">
						<h5 className="text-2xl font-bold tracking-tight text-gray-900">Artikel 2</h5>
					</div>
			</div>
			<div className="bg-white rounded-sm shadow-xl -rotate-3 hover:cursor-default">
				<img className="rounded-t-sm aspect-video" src="https://assets.apologetik-projekt.de/image?src=https%3A%2F%2Fapologetik-strapi.s3.eu-central-003.backblazeb2.com%2FDesign_ohne_Titel_6_38de128dbf.png&width=900&height=498&fit=cover&position=center&background[]=0&background[]=0&background[]=0&background[]=0&quality=80&compressionLevel=9&loop=0&delay=100&crop=null&contentType=image%2Fwebp" alt="" />
				<div className="p-4">
					<h5 className="font-mono text-2xl font-bold tracking-tight text-gray-900 leading-none">Historische Zuverlässigkeit des Lukas-Evangeliums</h5>
				</div>
			</div>
			</div>
			<div className="text-white md:px-4">
				<h3 className="text-3xl font-medium font-mono">Lese unseren Blog</h3>
				<p className="my-3 text-gray-200">Artikel zu Apologetik, Theologie, Philosophie und Wissenschaft.</p>
				<Link prefetch="intent" to="/blog" className="text-black font-medium inline-flex bg-white px-3 py-2 rounded-px mt-5 text-sm hover:opacity-90 duration-150 transition">Zur Übersicht &rarr;</Link>
			</div>
		</div>
	)
}
