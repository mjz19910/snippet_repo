const {a}=require("./item_06_types");

/* spell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_05.js
*/
{
	Object.getPrototypeOf(a)[Symbol.toStringTag]="YT_NetworklessRequestController";
	Object.getPrototypeOf(a.jobManager)[Symbol.toStringTag]="JobManager";
	let count=0;
	/** @type {any[]} */
	let walk_done1=[];
	/** @type {any[]} */
	let walk_done2=[];
	/** @type {JsonReplacerFunction} */
	let json_replacer=(k,x) => {
		count++;
		if(k==="")
			return x;
		if(typeof x==="boolean")
			return x;
		if(typeof x==="undefined")
			return null;
		if(typeof x==="number")
			return x;
		if(typeof x==="string")
			return x;
		if(x===null)
			return x;
		if("type__" in x)
			return x;
		if(__primitive_map__.has(x))
			return {
				type__: "prim",
				prim: __primitive_map__.get(x)
			};
		if(typeof x==="function") {
			let idx=walk_done2.push(x)-1;
			let obj={
				type__: "function",
				name: x.name,
				prim: __primitive_map__.get(x),
				idx,
			};
			return obj;
		}
		if(walk_done2.includes(x)) {
			return {
				__type: "__prev_obj",
				idx: walk_done1.indexOf(x)
			};
		}
		if(walk_done1.includes(x)) {
			walk_done2.push(x);
			return x;
		}
		let idx=walk_done1.push(x)-1;
		return {
			type__: "__str_obj",
			x,
			idx,
			str: x.toString()
		};
	};
	let recon=JSON.parse(JSON.stringify(a,json_replacer));
	let wd2=walk_done2.slice();
	walk_done2.length=0;
	walk_done1.length=0;
	console.log("seen 1st pass #%s objs",count);
	count=0;
	wd2.push(a);
	for(let item of wd2) {
		if(typeof item==="function")
			continue;
		console.log("original",item);
		let r2=JSON.parse(JSON.stringify({
			item
		},json_replacer)).item;
		console.log("reconstructed",r2);
	}
	console.log("seen 2nd pass %s objs",count);
	recon;
}
