{
	/** @type {JsonReplacerFunction} */
	let json_replacer=(k,x) => {
		if(k==="")
			return x;
		if(typeof x==="boolean")
			return x;
		if(typeof x==="undefined")
			return x;
		if(typeof x==="number")
			return x;
		if(typeof x==="string")
			return x;
		if("_tag" in x)
			return x;
		if(__primitive_map__.has(x))
			return {
				_tag: "prim",
				prim: __primitive_map__.get(x)
			};
		if(typeof x==="function")
			return {
				type: "function",
				name: x.name,
				obj: {
					_tag: "fn_obj",
					prim: __primitive_map__.get(x),
					...x
				}
			};
		return x.toString();
	};
	JSON.parse(JSON.stringify(a,json_replacer));
}
