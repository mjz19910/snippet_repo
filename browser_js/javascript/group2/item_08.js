/** @type {import("./item_types")['inject_api']} */
let inject_api;
x: {
	/** @template U @template {U} T @arg {U} e @returns {T} */
	function as_cast(e) {
		/** @type {any} */
		let x=e;
		return x;
	}
	if(typeof exports!=='object') {
		if(!("inject_api" in window)) throw new Error("Missing");
		inject_api=as_cast(window.inject_api);
		break x;
	} else {
		({inject_api}=require("./item_types"));
	};
}
{
	let reversePrototypeChain=inject_api.reversePrototypeChain;
	inject_api.reversePrototypeChain=reversePrototypeChain;
	let xx=reversePrototypeChain;
	xx.add_target(window);
	let all_window_begin=Object.keys(Object.getOwnPropertyDescriptors(window))
		.map(e => {
			/** @type {{[x: string]:any}} */
			let fw=window;
			fw[e];
		})
		.filter(e => typeof e=='object'&&e!==null);
	/**
	 * @type {any[]}
	 */
	let seen=[];
	/**
	 * @param {any} value
	 */
	function inf_depth_iter(value) {
		if(value===inject_api) {
			return;
		}
		try {
			for(let x of value) {
				if(typeof x==='number')
					continue;
				if(seen.includes(x))
					continue;
				seen.push(x);
				xx.add_target(x);
				inf_depth_iter(x);
			}
		} catch {}
	}
	inf_depth_iter(all_window_begin);
	/**
	 * @param {{ (): { done: boolean; value: Element}}} next
	 */
	function make_iterator_with(next) {
		return {[Symbol.iterator]: () => ({next})};
	}
	// first_level_iter(all_window_begin);
	/**
	 * @param {HTMLAllCollection} html_col
	 */
	function html_iterator(html_col) {
		let i=0;
		return make_iterator_with(() => {
			if(i>html_col.length) {
				return {
					done: true,
					value: html_col[html_col.length-1],
				};
			}
			let ret=html_col[i];
			i++;
			return {
				done: false,
				value: ret,
			};
		});
	}
	/**
	 * @param {HTMLAllCollection} all_array
	 */
	function first_level_iter(all_array) {
		for(let x of html_iterator(all_array)) {
			if(typeof x==='number')
				continue;
			xx.add_target(x);
		}
	}
	function document_iter() {
		let all_document=document.all;
		first_level_iter(all_document);
		//inf_depth_iter(all_document);
	}
	document_iter();
	xx.generate();
}
