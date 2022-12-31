/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo_v2/javascript/group2/item_02.js
v2 (cur): snippet_repo_v2/javascript/group2/item_02.js
*/
x: {
	if(!('temp1' in window)) {
		if(queryObjects) {
			console.log("please export the queryObjects result as temp1");
			queryObjects(Function.prototype);
		} else {
			console.log("please open the console/devtools");
		}
		break x;
	}
	/** @arg {any} v */
	function any(v) {return v;}
	/** @type {{}[]} */
	let tmp=any(window.temp1);
	let GeneratorFunction=(function*() {}).prototype.constructor;
	let not_proto=tmp.filter(e => e!==Function.prototype&&e!==GeneratorFunction&&e!==GeneratorFunction.constructor);
	let fn_map_str=[...new Set(not_proto.map(e => {
		try {
			return e.toString();
		} catch {
			return "";
		}
	}
	))];
	let ids=not_proto.map(e => {
		try {
			return [e,fn_map_str.indexOf(e.toString())];
		} catch(x) {
			throw new AggregateError([e,x],"reasons");
		}
	}
	);
	for(let x of ids) {
		if(fn_map_str[any(x[1])]&&!fn_map_str[any(x[1])]?.includes("gold")) continue;
		console.log(x[0],fn_map_str[any(x[1])]);
	}
}
