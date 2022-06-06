import { Link, Links, Meta, useCatch } from "@remix-run/react"
import HttpStatusCode from "~/types/http_status_code"
import clsx from "clsx"

export function CatchBoundary() {
  const caught = useCatch()
  const oops = caught.status !== HttpStatusCode.SERVICE_UNAVAILABLE

	const notFound = caught?.status === HttpStatusCode.NOT_FOUND
	if (notFound) return <Status404 />

  return (
    <html>
      <head>
        <title>{oops ? 'Oops!' : 'Vorübergehend nicht erreichbar!'}</title>
        <Meta />
        <Links />
      </head>
      <body className={clsx("h-screen p-3 md:p-6", oops ? 'bg-red-500/80' : 'bg-[#f8af3ccc]')}>
        <main className="h-full p-5 md:p-8 bg-white shadow-sm rounded">
          {
            oops 
            ? <h1 className="font-bold text-3xl">{caught.status} - {caught.statusText}</h1>
            : <Maintenance />
          }
        </main>
      </body>
    </html>
  )
}

function Maintenance() {
  return (
    <div className="mt-8 md:mt-18 p-1">
      <img height="266" width="400" className="w-full mx-auto md:w-[400px] mb-8 md:mb-10" src="/maintenance.svg" alt="Bauarbeiten" />
      <section className="mt-4 text-gray-800 max-w-prose mx-auto">
        <h2 className="md:text-center text-2xl md:text-4xl font-bold md:font-extrabold mb-4 md:mb-5 text-gray-900 leading-tight">Vorübergehend nicht erreichbar!</h2>
        <p className="md:text-center break-normal">
          Diese Seite ist aktuell leider nicht er&shy;reich&shy;bar. Wir arbeiten daran sie schnellst&shy;möglichst wieder zur Verfügung zu stellen. 
          Komme gerne später nochmal vorbei.
        </p>
        <p className="md:text-center break-normal mt-4 md:mt-2">
          In der Zwischenzeit kannst du auf <a className="font-medium text-black underline underline-offset-1 transition-colors hover:text-blue-800" target="_blank" href="https://instagram.com">Instagram</a> oder <a className="font-medium text-black underline underline-offset-1 transition-colors hover:text-blue-800" target="_blank" href="https://youtube.com">YouTube</a> mehr über die Arbeit des Apologetik Projekts erfahren.
        </p>
      </section>
    </div>
  )
}

export default function Status404() {
  return (
		<html>
			<head>
				<title>404 - Not Found</title>
				<link rel="stylesheet" href="/404.css" />
				<Links />
				<Meta />
			</head>
			<body className="bg-[#101010]">
				<div className="message overflow-hidden">
					<h1>404</h1>
					<div className="bottom">
						<p className="mb-10">Wir konnten die Seite leider nicht finden</p>
						<Link to="/">Zur Startseite</Link>
					</div>
				</div>
			</body>
    </html>
	)
}