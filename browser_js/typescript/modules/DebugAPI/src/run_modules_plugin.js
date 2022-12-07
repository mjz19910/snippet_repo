import {found_modules} from "./found_modules.js";
import {gen_function_prototype_use} from "./gen_function_prototype_use.js";
import {resolve_function_constructor} from "./resolve_function_constructor.js";

export function run_modules_plugin() {
	if(!window.g_api) throw 1;
	let g_api=window.g_api;
	if(!g_api.function_as_string_vec) throw 1;
	let function_as_string_vec=g_api.function_as_string_vec;
	let function_prototype=resolve_function_constructor().prototype;

	let function_prototype_call=function_prototype.call;
	let function_prototype_apply=function_prototype.apply;
	let function_prototype_bind=function_prototype.bind;

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_call=function_prototype_call.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_apply=function_prototype_call.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_bind=function_prototype_call.bind(function_prototype_bind);

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_call=function_prototype_bind.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_apply=function_prototype_bind.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_bind=function_prototype_bind.bind(function_prototype_bind);

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_apply_call=function_prototype_apply.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, nApplyArgs:any[]])=>any} */
	let bound_apply_apply=function_prototype_apply.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...bindArgs:any[]])=>(...args:any[])=>any}*/
	let bound_apply_bind=function_prototype_apply.bind(function_prototype_bind);

	let safe_function_prototype={
		apply: function_prototype.apply,
		bind: function_prototype.bind,
		call: function_prototype.call,
	};
	console.log(safe_function_prototype);

	let info=gen_function_prototype_use(safe_function_prototype);
	console.log(info);

	let bound_function_prototype_vec=[
		[function_prototype_call,function_prototype_call,bound_call_call],
		[function_prototype_call,function_prototype_apply,bound_call_apply],
		[function_prototype_call,function_prototype_bind,bound_call_bind],
		[function_prototype_apply,function_prototype_call,bound_apply_call],
		[function_prototype_apply,function_prototype_apply,bound_apply_apply],
		[function_prototype_apply,function_prototype_bind,bound_apply_bind],
		[function_prototype_bind,function_prototype_call,bound_bind_call],
		[function_prototype_bind,function_prototype_apply,bound_bind_apply],
		[function_prototype_bind,function_prototype_bind,bound_bind_bind],
	];
	console.log(bound_function_prototype_vec);
	Function.prototype.call=function_prototype_call_inject;
	/**@this {Function} @arg {any} thisArg @arg {any[]} argArray */
	function function_prototype_call_inject(thisArg,...argArray) {
		if(!g_api.function_as_string_vec) throw 1;
		let ret;
		switch(argArray.length) {
			case 2: {
				if(thisArg===argArray[1]&&argArray[0].exports==thisArg) {
					var ars=Object.entries(argArray[2]).filter(([,e]) => e instanceof Array);
					var ars_i=ars[0][1].indexOf(this);
					if(ars[0][1].indexOf(this)>-1) {
						console.log("found module array:","require."+ars[0][0]);
						var mods=Object.entries(argArray[2]).filter(([_a,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===argArray[0]);
						if(mods.length>0) {
							console.log("found module cache:","require."+mods[0][0]);
							found_modules(ars[0][1],mods[0][1],argArray[2]);
						}
					}
				}
			} break;
			default:
				ret=bound_apply_call(this,[thisArg,argArray]);
		}
		if(function_as_string_vec.indexOf(this.toString())==-1) {
			function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	/**
	 * @this {()=>void}
	 * @param {any} tv
	 * @param {any} r
	 */
	function function_prototype_apply_inject(tv,r) {
		let ret=bound_apply_call(this,[tv,r]);
		if(function_as_string_vec.indexOf(this.toString())==-1) {
			function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	Function.prototype.apply=function_prototype_apply_inject;
}
