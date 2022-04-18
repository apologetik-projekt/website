import { Link } from "@remix-run/react"

export default function Footer(){

	return (
		<footer className="w-full bg-gray-900 text-white mt-10">
			<div className="xl:px-40 pb-12 px-4 lg:px-2 max-w-5xl mx-auto">
				<div className="w-full pt-12 flex flex-col sm:flex-row justify-between">
					<div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
						<Link to="/" className="font-sans leading-none font-black tracking-wide text-xl">DAS APOLOGETIK <br/> PROJEKT</Link>
						<p className="opacity-80">Christen zurüsten, Zweiflern begegnen, Skeptikern antworten.</p>
					</div>
					
					<div className="w-full sm:w-3/5 flex flex-col sm:items-end mt-4 sm:mt-0 mr-1">
						<ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5">
							<li><Link to="/about/team" className="opacity-80 hover:opacity-90 hover:border-b border-white">Über uns</Link></li>
							<li><Link to="/kontakt" className="opacity-80 hover:opacity-90 hover:border-b border-white">Kontakt</Link></li>
							<li><Link to="/impressum" className="opacity-80 hover:opacity-90 hover:border-b border-white">Impressum</Link></li>
							<li><Link to="/datenschutz" className="opacity-80 hover:opacity-90 hover:border-b border-white">Datenschutz</Link></li>
						</ul>
						<div className="w-full sm:w-1/5 pt-4 flex items-end">
							<div className="flex flex-row space-x-4">
								<a target="_blank" href="https://instagram.com/derapologetikchannel"><svg className="opacity-75 hover:opacity-90" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/></svg></a>
								<a target="_blank" href="https://youtube.com/c/derapologetikchannel"><svg className="opacity-75 hover:opacity-90" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z"/></svg></a>
								<a target="_blank" href="https://tiktok.com/@apologetikchannel">
									<svg className="opacity-75 hover:opacity-95" height="20" width="20" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
										<g clipRule="evenodd">
											<path fill="white" d="M121.168 61.436c10.944 7.819 24.352 12.42 38.832 12.42V46.005a39.276 39.276 0 01-8.155-.853v21.923c-14.48 0-27.885-4.601-38.832-12.42v56.835c0 28.432-23.06 51.479-51.505 51.479-10.613 0-20.478-3.207-28.673-8.707 9.353 9.558 22.396 15.488 36.826 15.488 28.447 0 51.508-23.047 51.508-51.48V61.436zm10.06-28.098c-5.593-6.107-9.265-14-10.06-22.726V7.03h-7.728c1.945 11.09 8.58 20.565 17.788 26.308zm-80.402 99.107a23.439 23.439 0 01-4.806-14.256c0-13.004 10.548-23.547 23.56-23.547 2.426-.002 4.836.37 7.148 1.103V67.272a51.927 51.927 0 00-8.152-.469v22.162a23.6 23.6 0 00-7.15-1.103c-13.013 0-23.56 10.543-23.56 23.548 0 9.195 5.272 17.157 12.96 21.035z"/>
											<path fill="white" d="M151.845 45.152v-5.928a38.839 38.839 0 01-20.617-5.887 38.951 38.951 0 0020.617 11.815zM113.44 7.03a39.586 39.586 0 01-.427-3.198V.25H84.985v111.24c-.045 12.967-10.574 23.467-23.56 23.467-3.813 0-7.412-.904-10.6-2.512 4.305 5.647 11.103 9.292 18.755 9.292 12.984 0 23.515-10.5 23.56-23.468V7.03zM68.576 66.803v-6.311a52.038 52.038 0 00-7.067-.479C33.06 60.013 10 83.061 10 111.49c0 17.824 9.063 33.532 22.835 42.772-9.083-9.28-14.68-21.982-14.68-35.993 0-28.067 22.474-50.889 50.42-51.466z"/>
										</g>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}