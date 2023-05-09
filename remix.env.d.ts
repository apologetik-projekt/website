/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-pages/globals" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
	KIRBY_AUTH_TOKEN: string
	KIRBY_API_URL: string
	STRAPI_API_URL: string
	STRAPI_AUTH_TOKEN: string
	RECAPTCHA_PUBLIC_KEY: string
	RECAPTCHA_SECRET_KEY: string
	CONTACT_FORM_EMAIL: string
	NODE_ENV: string
	FRANK_SECRET_KEY: string
	FRANK_API_URL: string
}