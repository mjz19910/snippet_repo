/** @template T,U */
export class Future {
	/** @arg {T} v @arg {(x:T)=>U} f */
	constructor(v,f) {
		this.v=v;
		this.f=f;
	}
	/** @public @template V @arg {(x:U)=>V} f */
	run_with(f) {
		let inner=this.f(this.v);
		return f(inner);
	}
}