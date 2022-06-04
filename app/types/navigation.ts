export interface NavigationItem {
	id: number,
	title: string,
	menuAttached: boolean,
	order: number,
	path: string,
	type: string,
	uiRouterKey: string,
	slug: string,
	external: boolean,
	related: {
		id: number,
		createdAt: Date,
		updatedAt: Date,
		publishedAt: Date,
		title: string,
		slug: string,
		__contentType: string,
		navigationItemId: number,
		__templateName: string
	},
	items: this[]
}