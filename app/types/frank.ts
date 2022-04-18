export interface SuccessfulResponse {
	status: number
}

export interface EtherialResponse extends SuccessfulResponse {
	etherial: {
		messageId: string,
		url: string
	}
}