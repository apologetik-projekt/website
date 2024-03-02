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
export function AudioPlayer({ slug }: { slug: string }) {
	const [isPlaying, setPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState<number>()
	const [isMuted, setMuted] = useState(false)
	const [playbackSpeed, setPlaybackSpeed] = useState(speeds.indexOf(1))
	const audioRef = useRef<HTMLAudioElement>(null)
	const progressRef = useRef<HTMLProgressElement>(null)

	useEffect(() => {
		setDuration(audioRef.current?.duration ?? 0)
	}, [])

	function play(e) {
		e.target.focus()
		audioRef.current?.play()
		setDuration(audioRef.current?.duration)
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

	function mute(e) {
		e.target.focus()
		if (audioRef.current) {
			audioRef.current.muted = !audioRef.current.muted
			setMuted(muted => !muted)
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
			const currentDuration = audioRef.current.duration
			audioRef.current.currentTime = Math.floor(currentDuration) * (e.nativeEvent.offsetX / e.target.offsetWidth);
		}
	}

  return (
    <div className="pcast-player accent-yellow-100 dark:accent-yellow-600">
      <div className="rounded-sm bg-gray-200 text-gray-900 dark:bg-black dark:text-white text-sm overflow-hidden p-2 box-border flex gap-1.5 items-center">
				{ isPlaying ? (
						<button id="pause" onClick={pause} className="bg-gray-400/50 dark:bg-gray-900 border-0 rounded-sm p-2 leading-6 appearance-none">
							<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>
						</button>
					) : (
						<button id="play" onClick={play} className="bg-gray-400/50 dark:bg-gray-900 border-0 rounded-sm p-2 leading-6 appearance-none">
							<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="1 0 24 24" fill="currentColor"><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>
						</button>
					)
				}
        <button id="rewind" onClick={rewind} className="bg-gray-400/50 dark:bg-gray-900 border-0 rounded-sm p-2 leading-6 appearance-none">
					<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="-1 -1 26 26" fill="currentColor"><path d="M2 4C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20C2.55228 20 3 19.5523 3 19V13.3332L12.2227 19.4816C12.3048 19.5364 12.4013 19.5656 12.5 19.5656C12.7762 19.5656 13 19.3418 13 19.0656V13.3332L22.2227 19.4816C22.3048 19.5364 22.4013 19.5656 22.5 19.5656C22.7762 19.5656 23 19.3418 23 19.0656V4.93413C23 4.83542 22.9708 4.73892 22.9161 4.65679C22.7629 4.42702 22.4524 4.36493 22.2227 4.51811L13 10.6665V4.93413C13 4.83542 12.9708 4.73892 12.9161 4.65679C12.7629 4.42702 12.4524 4.36493 12.2227 4.51811L3 10.6666V5C3 4.44772 2.55228 4 2 4Z"></path></svg>
        </button>
        <span className="px-1 tracking-wide">{secondsToMMSS(currentTime)}</span>
        <progress onClick={setProgress} ref={progressRef} className="cursor-col-resize flex-grow appearance-none h-4" value={currentTime} max={duration} />
        <span className="px-1 tracking-wide">{secondsToMMSS(duration ?? 0)}</span>
        <button id="speed" onClick={setSpeed} className="bg-gray-400/50 dark:bg-gray-800 h-[34px] w-[52px] text-center border-0 rounded-sm px-2 appearance-none">{speeds[playbackSpeed]}x</button>
        <button id="mute" onClick={mute} className="bg-gray-400/50 dark:bg-gray-800 border-0 rounded-sm p-2 leading-6 appearance-none">
					{ isMuted 
						? <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="-1 -1 26 26" fill="currentColor"><path d="M5.88889 16H2C1.44772 16 1 15.5523 1 15V9.00001C1 8.44772 1.44772 8.00001 2 8.00001H5.88889L11.1834 3.66815C11.3971 3.49329 11.7121 3.52479 11.887 3.73851C11.9601 3.82784 12 3.93971 12 4.05513V19.9449C12 20.221 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9498L19 13.4142L15.4645 16.9498L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05026L19 10.5858L22.5355 7.05026L23.9497 8.46447L20.4142 12Z"></path></svg>
						: <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="-1 -1 26 26" fill="currentColor"><path d="M8.88889 16H5C4.44772 16 4 15.5523 4 15V9.00001C4 8.44772 4.44772 8.00001 5 8.00001H8.88889L14.1834 3.66815C14.3971 3.49329 14.7121 3.52479 14.887 3.73851C14.9601 3.82784 15 3.93971 15 4.05513V19.9449C15 20.221 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16ZM18.8631 16.5911L17.4411 15.169C18.3892 14.4376 19 13.2901 19 12C19 10.5697 18.2493 9.31469 17.1203 8.6076L18.5589 7.169C20.0396 8.2616 21 10.0187 21 12C21 13.8422 20.1698 15.4904 18.8631 16.5911Z"></path></svg>}
				</button>
      </div>
      <audio
				ref={audioRef}
				preload="metadata" 
				src={`http://localhost:4000/audio/${slug}.mp3`}
				onTimeUpdate={() => { setCurrentTime(audioRef.current?.currentTime ?? 0) } } 
			/>
    </div>
  );
}