export interface StrapiResponse {
	data: any,
	error?: {
		status: number, // HTTP Status Code?
		name: string,
		message: string,
		details: unknown
	}
	meta: unknown
}