
export class MakeRequirements<T extends readonly string[]> {
	private _result: T;
	/** @template {string[]} T @arg {T} args */
	constructor(...args: T) {
		this._result=args;
	}
	get result(): Readonly<T> {
		return this._result;
	}
}
