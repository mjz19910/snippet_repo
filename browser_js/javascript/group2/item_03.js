x:{
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
	let temp1=any(window.temp1);
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
	for (let x of ids) {
		console.log(x);
		break;
	}
}
