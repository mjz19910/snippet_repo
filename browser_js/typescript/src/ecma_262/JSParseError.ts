import captureStackTrace from "./capture-stack-trace.js";

export class JSParseError extends Error {
	constructor(message: string) {
		super(message);
		captureStackTrace(this,this.constructor);
	}
}
