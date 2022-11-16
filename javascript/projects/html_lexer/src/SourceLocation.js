
export class SourceLocation {
	constructor() {
		this.error=new Error;
	}
	static current() {
		return new this();
	}
	toString() {
		return this.error.toString();
	}
}
