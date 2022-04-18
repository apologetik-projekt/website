import { json } from "@remix-run/cloudflare"
import FrankClient from "~/api/frank"

// Send Email to contact form email
// We're not throwing errors, because we cant to show the error above the component
export async function action({ request, context }) {
	const formData = Object.fromEntries(await request.formData())
	const frank = new FrankClient({
		secret: context.env.FRANK_SECRET_KEY,
		email: context.env.CONTACT_FORM_EMAIL
	})

	// Check ReCAPTCHA
	console.log(formData)
	const isHuman = await frank.validateHuman(context.env.RECAPTCHA_SECRET_KEY, formData['g-recaptcha-response'])
	if (!isHuman)	return json({error: 'Du bist ein Roboter! 🤖'}, {status: 406})

	// Send Mail
	const mail = await frank.sendMail(formData)
	if (mail.status !== 200) {
		const error = 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.'
		const status = mail.status || 500
		return json({ error, status })
	}
	return json(mail)
}