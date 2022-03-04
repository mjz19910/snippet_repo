export class JSParseError extends Error {
	stack = "JSParseError";
	/**@arg {string} message */
	constructor(message) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
	}
}
