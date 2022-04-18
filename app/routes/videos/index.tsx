import { LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import { Link, useLoaderData } from "@remix-run/react";
import { Kirby } from "~/api/kirby"
import type { Video } from "~/types/video";

export const meta: MetaFunction = () => {
  return {
    title: "Apologetik Channel - Videos",
	}
}

export const loader: LoaderFunction = async ({ context }) => {
	const kirby = new Kirby(context.KIRBY_API_URL, context.KIRBY_AUTH_TOKEN)
	const videos = await kirby.fetchKQL({
		query: "site.find('videos').children",
		select: {
			title: true,
			image: "page.content.image",
			id: "page.content.id",
			description: "page.description.html"
		}
	}).then(res => res.data) as Video[]

	return { videos }
};

export default function Videos() {
	const { videos } = useLoaderData() as { videos: Video[] }
	const firstVideo = videos[0]
  return (
		<>
		<section id="currentVideo" className="bg-gray-200 w-full -mt-24 pt-28">
			<div className="max-w-4xl mx-auto pb-8 md:pb-28 mb-8 px-4">
				<p className="uppercase font-semibold text-yellow-900/90 leading-loose ml-1 mb-0.5 text-[0.8rem] tracking-wide">
					<svg className="inline -mt-1 mr-1 text-yellow-800" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
					Aktuelles Video
				</p>
				<div id="feature" className="flex flex-col md:flex-row mb-4">
					<div id="video_thumb" className="md:w-7/12 flex-shrink-0">
						<Link to={firstVideo.id} className="h-0 block bg-black relative pb-16:9 overflow-hidden">
							<div className="group absolute w-full h-full top-0 right-0 grid stack items-center shadow-sm" >
								<img alt={firstVideo.id} className="object-cover" src={firstVideo.image.replace('default', 'maxresdefault')} /> 
								<div className="h-full group-hover:opacity-20 transition-opacity duration-200 w-full bg-white opacity-0"></div>
								<div className="absolute w-full mx-auto group-hover:scale-105 ease-in-out duration-500" style={{filter: "drop-shadow(0 0 16px rgb(0 0 0 / 30%))"}}>
									<svg id="play_button" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white mx-auto" viewBox="0 0 56 56" fill="currentColor"><path d="M28,56A28.008,28.008,0,0,1,17.1,2.2,28.007,28.007,0,0,1,38.9,53.8,27.825,27.825,0,0,1,28,56ZM20.355,18.043V41.378l21-11.667-21-11.668Z" fill="currentColor"/></svg>
								</div>
							</div> 
						</Link>
					</div>
			
					 <div id="video_text" className="md:w-5/12 mt-3 md:mt-0 px-0.5 md:pl-6 md:h-74 overflow-hidden" style={{flexBasis: "100%"}}>
						<h2 className="font-extrabold leading-none text-4xl">
								{firstVideo.title}
						</h2>
						<p className="text-gray-600 text-sm leading-snug mt-3 h-20 overflow-y-hidden" 
							dangerouslySetInnerHTML={{__html: firstVideo.description.replace('https', '')}}>
						</p><span className="float-left leading-snug text-gray-500 -mt-2">...</span>
					</div> 
			</div>

			</div>
		</section>
    <main className="max-w-4xl mx-auto px-4 md:-mt-20 pb-10">		
			<section className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-6">
			{
				videos.slice(1).map((video, index)=>(
					<Link key={index} to={`/videos/${video.id}`} className="font-bold hover:opacity-80 duration-200">
						<img alt={video.title} className="object-cover aspect-video shadow-sm" src={video.image.replace('default', 'hqdefault')} width={300} height={166} /> 

						<h3 className="font-bold text-gray-900 md:leading-tight text-xl md:text-base mt-2 md:mt-1">{video.title}</h3>
					</Link>
				))
			}		
				<Link key="subscribe" to="#" className="font-bold hover:opacity-80">
					<img alt={""} className="object-cover aspect-video shadow-sm" src={"https://yt3.ggpht.com/ytc/AAUvwnid48FmH7F33DseEmAsFdBI11ds_qhvHwrS0cez=s176-c-k-c0x00ffffff-no-rj"} width={300} height={166} /> 
					<h3 className="font-bold leading-tight ml-0.5">YouTube-Kanal abonnieren</h3>
				</Link>
			</section>		
		</main>
		</>
  )
}

function VideoThumbnail({data: {title, uid, thumbnail}}) {
  return (
    <a href="#" className="block bg-black aspect-video w-full overflow-hidden shadow-sm">
      <div className="group grid stack" >
        <img alt="Youtube Thumbnail" className="object-cover" src={`https://img.youtube.com/vi/${uid}/mq${thumbnail}.jpg`} />
        <div className="h-full group-hover:opacity-70 transition-opacity duration-200 w-full bg-gradient-to-tr from-teal-900 to-coolgray-700 opacity-40 md:opacity-50 bg-blend-saturation"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-3 text-white text-3xl md:text-xl lg:text-2xl font-extrabold leading-none md:tracking-wide" style={{filter: "drop-shadow(0 0 20px rgb(10 40 40 / 80%))"}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 md:h-7 md:w-7 -ml-0.5 mb-2" viewBox="0 0 56 56" fill="currentColor">
            <path d="M28,56A28.008,28.008,0,0,1,17.1,2.2,28.007,28.007,0,0,1,38.9,53.8,27.825,27.825,0,0,1,28,56ZM20.355,18.043V41.378l21-11.667-21-11.668Z" fill="currentColor"/>
          </svg>
          {title}
        </div>
      </div> 
    </a>
  )
}