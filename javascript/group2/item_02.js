/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo_v2/javascript/group2/item_02.js
v2 (cur): snippet_repo_v2/javascript/group2/item_02.js
*/
x:{
	if(!window.temp1) {
		console.log("please export the queryObjects result as temp1");
		queryObjects(Function.prototype);
		break x;
	}
	let GeneratorFunction = (function*(){}).prototype.constructor;
	let not_proto = temp1.filter(e=>e !== Function.prototype && e !== GeneratorFunction && e !== GeneratorFunction.constructor);
	let fn_map_str = [...new Set(not_proto.map(e=>{
		try {
			return e.toString()
		} catch {
			return ""
		}
	}
	))];
	let ids = not_proto.map(e=>{
		try {
			return [e, fn_map_str.indexOf(e.toString())]
		} catch (x) {
			return {
				type: "error",
				cause: e
			}
		}
	}
	);
	let id_t = [];
	for (let x of ids) {
		if(fn_map_str[x[1]] && !fn_map_str[x[1]]?.includes("gold"))continue;
		console.log(x[0],fn_map_str[x[1]]);
	}
}
