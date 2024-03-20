import { useEffect, useRef, useState } from "react"

const speeds = [0.8, 1.0, 1.1, 1.25, 1.5, 2]
function secondsToMMSS(duration: number) {
	if (Number.isNaN(duration)) {
		duration = 0
	}
	duration = Math.floor(duration)
	const date = new Date(0)
	const minutes = Math.floor(duration / 60)
	date.setMinutes(minutes)
	const seconds = duration - minutes * 60
	date.setSeconds(seconds)
	return date.toISOString().substring(14,19)
}

export function AudioPlayer({ slug, defaultTime }: { slug: string, defaultTime?: number }) {
	const [isPlaying, setPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState<number>(defaultTime ?? 0)
	const [playbackSpeed, setPlaybackSpeed] = useState(speeds.indexOf(1))
	const audioRef = useRef<HTMLAudioElement>(null)
	const progressRef = useRef<HTMLProgressElement>(null)

	function setMetaData() {
		const duration = audioRef.current?.duration
		if (duration && isFinite(duration)) {
			setDuration(duration)
		}
	}

	useEffect(() => {
		setMetaData()
		audioRef.current?.addEventListener("pause", () => setPlaying(false))
		audioRef.current?.addEventListener("play", () => setPlaying(true))
	}, [audioRef.current])

	function play(e) {
		e.target.focus()
		audioRef.current?.play()
		setPlaying(true)
	}

	function pause(e) {
		e.target.focus()
		audioRef.current?.pause()
		setPlaying(false)
	}

	function rewind(e) {
		e.target.focus()
		if (audioRef.current) {
			audioRef.current.currentTime -= 15
		}
	}

	function setSpeed(e) {
		e.target.focus()
		if (audioRef.current) {
			let index = playbackSpeed + 1 < speeds.length ? playbackSpeed + 1 : 0
			audioRef.current.playbackRate = speeds[index]
			setPlaybackSpeed(index)
		}
	}

	function setProgress(e) {
		if (audioRef.current) {
			audioRef.current.currentTime = Math.floor(audioRef.current.duration) * (e.nativeEvent.offsetX / e.target.offsetWidth);
		}
	}

  return (
    <div className="pcast-player accent-yellow-100 dark:accent-yellow-600 select-none">
      <div className="rounded-px bg-black text-gray-100 dark:bg-black dark dark:text-white text-sm overflow-hidden p-2 box-border flex flex-col">
				<div className="w-full flex gap-1.5 items-center mb-2">
					<progress onClick={setProgress} ref={progressRef} className="cursor-col-resize flex-grow appearance-none h-6 md:h-3" value={currentTime + 1} max={duration} />
				</div>
				<div className="w-full flex items-center gap-1.5">

				{ isPlaying ? (
						<button id="pause" onClick={pause} className="bg-gray-600/70 hover:brightness-110 transition-all duration-200 active:opacity-90 rounded-px p-2 leading-6 appearance-none">
							<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>
						</button>
					) : (
						<button id="play" onClick={play} className="bg-gray-600/70 hover:brightness-110 transition-all duration-200 active:opacity-90 rounded-px p-2 leading-6 appearance-none">
							<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="1 0 24 24" fill="currentColor"><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>
						</button>
					)
				}
        <button id="rewind" onClick={rewind} className="bg-gray-600/70 hover:brightness-110 transition-all duration-200 active:opacity-90 rounded-px p-2 leading-6 appearance-none">
					<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="-1 -1 26 26" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22 6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20 16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM8.5 15.5V8.5H10V15.5H8.5ZM12 8.5H16.75V10H13.5V11.25H14.875C16.0486 11.25 17 12.2014 17 13.375 17 14.5486 16.0486 15.5 14.875 15.5H12V14H14.875C15.2202 14 15.5 13.7202 15.5 13.375 15.5 13.0298 15.2202 12.75 14.875 12.75H12V8.5Z"></path></svg>
        </button>
				<div className="font-mono flex gap-1 px-1">
					<span className="tracking-wide">{secondsToMMSS(currentTime)}</span>/
					<span className="tracking-wide">{secondsToMMSS(duration ?? 0)}</span>
				</div>
        <div className="flex-grow" />
				<button className="md:hidden opacity-80 p-2 items-center" onClick={() => alert("Transparenzhinweis: Audioaufnahme wurde künstlich generiert.")}>
					<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
				</button>
				<div className="hidden md:flex opacity-50 hover:opacity-65 text-yellow-50 transition-opacity duration-500 tracking-wide p-2 appearance-none items-center gap-2 hover:cursor-default">
					<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
					<span className="font-light text-xs group-hover:block leading-none">Audioaufnahme wurde künstlich generiert</span>
				</div>
        <button id="speed" onClick={setSpeed} className="bg-gray-600/70 hover:brightness-110 transition-all duration-200 active:opacity-90 h-[34px] w-14 text-center rounded-px px-2 appearance-none">{speeds[playbackSpeed]}x</button>
				</div>
      </div>
      <audio
				ref={audioRef}
				preload="metadata"
				onLoadedData={() => setMetaData()}
				src={`https://assets.apologetik-projekt.de/audio/${slug}.mp3`}
				onTimeUpdate={() => { setCurrentTime(audioRef.current?.currentTime ?? 0) } } 
			/>
    </div>
  );
}