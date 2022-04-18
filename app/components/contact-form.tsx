import ReCAPTCHA from "react-google-recaptcha"
import React, { useEffect, useRef } from 'react'
import { useFetcher } from "@remix-run/react"

export const meta = () => ({
	noindex: {
		name: 'robots',
		content: 'noindex'
	}
})


export default function ContactForm({recaptchaKey}) {
	const fetcher = useFetcher()
	const formRef = useRef<HTMLFormElement>(null)
	const submitButtonRef = useRef<HTMLButtonElement>(null)
	const captchaRef = useRef<React.RefObject<ReCAPTCHA>>(null)
	
	const isSubmitting = fetcher.state == 'submitting'
	const isActionCompleted = fetcher.type === 'done'
	const isSucceeded = isActionCompleted && fetcher.data.ok

	function resetForm() {
		formRef.current?.reset()
		submitButtonRef.current?.blur()
	}

	useEffect(() => {
		if (isSucceeded) resetForm()
		console.log(recaptchaKey)
	}, [fetcher])

	return (
		<div className="flex max-w-2xl flex-col mx-auto space-y-5 hyphens-auto mt-6">
			<fetcher.Form ref={formRef} method="post" action="/api/email">

				{isActionCompleted ? (
					isSucceeded ? (
						<p className="bg-green-500 bg-opacity-20 p-3 font-medium text-center mb-6 text-green-900">
							Deine Nachricht wurde versendet. Wir melden uns baldmöglichst bei dir. <br />
							{fetcher.data.etherial && 
								<strong><a target="blank" href={fetcher.data.etherial?.url}>Test-Nachricht ansehen &rarr;</a></strong>
							}
						</p>
					) : fetcher.data.error ? (
						<p className="bg-red-500 bg-opacity-20 p-3 font-medium text-center mb-6 text-red-900">{fetcher.data.error}</p>
					) : null
				) : null}

				<div className="space-y-6 text-gray-800 uppercase tracking-wide font-bold">
					<div>
						<label className="text-xs leading-none" htmlFor="name">Name</label>
						<input
							className="block mt-1 mb-2 w-full input-field"
							required placeholder="Dein Name" name="name" type="text"
						/>
					</div>
					<div>
						<label className="text-xs leading-none" htmlFor="email">E-Mail</label>
						<input
							required placeholder="example@gmail.com"
							autoComplete="email"
							className="block mt-1 mb-2 box-border w-full input-field" name="email" type="email"
						/>
					</div>

					<div>
						<label className="text-xs leading-none" htmlFor="message">Nachricht</label>
						<textarea spellCheck={false}
							required placeholder="Deine Nachricht an uns" rows={8}
							className="block my-1 w-full input-field"
							name="message">
						</textarea>
					</div>
					<div className="flex items-center">
						<button type="submit" disabled={isSubmitting} ref={submitButtonRef}
							className="py-2 px-5 font-semibold text-gray-100 bg-gray-800 shadow-xs hover:cursor-pointer hover:shadow-sm hover:bg-black focus:bg-yellow-900 focus:rounded-none focus:outline-yellow-500 focus:ring-yellow-500 focus:outline-0 focus:border-yellow-500 active:bg-gray-900">
							Senden
						</button>
						{isSubmitting && <LoadingSpinner />}
					</div>
					<ReCAPTCHA className="relative z-40" ref={captchaRef} sitekey={recaptchaKey} size="invisible" />
				</div>
			</fetcher.Form>
		</div>
	)
}

function LoadingSpinner() {
	return (
		<svg className="animate-spin ml-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
			<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	)
}