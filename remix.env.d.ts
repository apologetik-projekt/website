import type { AppLoadContext as DefaultAppLoadContext } from "@remix-run/cloudflare"
/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
	STRAPI_API_URL: string
	STRAPI_AUTH_TOKEN: string
	RECAPTCHA_PUBLIC_KEY: string
	RECAPTCHA_SECRET_KEY: string
	CONTACT_FORM_EMAIL: string
	NODE_ENV: string
	FRANK_SECRET_KEY: string
	FRANK_API_URL: string
}

declare module "@remix-run/server-runtime/dist/data.d.ts" {
  export interface AppLoadContext extends DefaultAppLoadContext {
    env: Env;
  }
}