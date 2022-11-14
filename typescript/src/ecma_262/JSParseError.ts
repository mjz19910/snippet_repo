export class JSParseError extends Error {
	constructor(message: string) {
		super(message);
		Error.captureStackTrace(this,this.constructor);
	}
}
