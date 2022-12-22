/**@arg {import("../types/SafeFunctionPrototype.js").SafeFunctionPrototype} safe_function_prototype */
export function gen_function_prototype_use(safe_function_prototype) {
	/** @type {["apply","bind","call"]}*/
	let keys=["apply","bind","call"];
	let apply_=safe_function_prototype[keys[0]];
	let bind_=safe_function_prototype[keys[1]];
	let call_=safe_function_prototype[keys[2]];
	/** @type {[typeof apply_,typeof bind_,typeof call_]}*/
	let funcs=[apply_,bind_,call_];

	let bound_bind=apply_.bind(bind_);
	let bound_call=apply_.bind(call_);
	let bound_apply=apply_.bind(apply_);

	/** @type {[typeof bound_apply,typeof bound_bind,typeof bound_call]}*/
	let bound_funcs=[
		bound_apply,
		bound_call,
		bound_apply,
	];
	return {funcs,bound_funcs};
}
