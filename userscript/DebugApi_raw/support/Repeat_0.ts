import {_DebugApiH_o} from "../DebugApi.user.js";

export const Repeat_0_H=_DebugApiH_o['Repeat_0'];

/** @template T */
export class Repeat_0<T> {
	value: T;
	times: number;
	/** @arg {T} value @arg {number} times */
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
}

const Ty=Repeat_0;
type TyT<T>=Repeat_0<T>;

declare global {
	const Repeat_0: typeof Ty;
	type Repeat_0<T>=TyT<T>;
}
