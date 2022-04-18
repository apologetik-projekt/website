import HttpStatusCode from "./http_status_code"

type Heading = {
	level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

type Block = {
		content: { 
				members?: Member[],
				level?: Heading['level'],
				text: string,
				heading?: string,
				testimonials?: any
		},
		id: string,
		isHidden: boolean,
		type: string
}

export type PageData = {
	content: {
		blocks: Block[],
		icon: string,
		parent: boolean,
		meta_title: string,
		meta_description: string,
		meta_canonical_url: string,
		meta_author: string,
		meta_image: string[],
		meta_phone_number: string,
		robots_noindex: string,
		robots_nofollow: string,
		robots_noarchive: string,
		robots_noimageindex: string,
		robots_nosnippet: string,
		title: string,
		text: string
	},
	id: string,
	num: number | null,
	options: {
		changeSlug: boolean,
		changeStatus: boolean,
		changeTemplate: boolean,
		changeTitle: boolean,
		create: boolean,
		delete: boolean,
		duplicate: boolean,
		read: boolean,
		preview: boolean,
		sort: boolean,
		update: boolean
	},
	parent: null, // whats this?
	slug: string,
	status: "listed" | "unlisted" | "draft" | "scheduled",
	template: string,
	title: string,
	url: string
}

export type KirbyResponse = {
	code: HttpStatusCode,
	data: PageData,
	status: "ok",
	type: "model"
}


type Member = {
	name: string, 
	image: {
		url: string
	}[],
	description: string
}

export type KirbyQuery = {
	code: HttpStatusCode,
	result: KirbyResponse,
	status: string,
}