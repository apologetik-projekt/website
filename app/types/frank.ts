export interface SuccessfulResponse {
	status: number
}

export interface EtherialResponse extends SuccessfulResponse {
	etherial: {
		messageId: string,
		url: string
	}
}

export interface ReCAPTCHAResponse {
  success: boolean,
  challenge_ts: string,
  hostname: string,
  'error-codes': unknown[]
}