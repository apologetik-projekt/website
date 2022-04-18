import { STATUS_CODES } from 'http'

class HttpError extends Error {
  public status: number
  constructor(code, message) {
    super(message)
    this.status = code
  }
}

export default HttpError
