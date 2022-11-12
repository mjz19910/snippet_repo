export class JSParseError extends Error {
	stack="JSParseError"
	constructor(message: string) {
		super(message)
		Error.captureStackTrace(this,this.constructor)
	}
}
