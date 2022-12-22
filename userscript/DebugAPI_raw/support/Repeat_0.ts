export const RepeatHolder=Symbol.for("Repeat_0");
/** @template T */
export class RepeatL_0<T> {
	value: T;
	times: number;
	/** @arg {T} value @arg {number} times */
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
}
