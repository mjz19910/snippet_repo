{
	let i=0;
	/** @param {any[]} v @param {() => void} target */
	function process_one(v,target) {
		let [e,j]=v;
		if(j===null) {
			return [e,j];
		}
		switch(typeof j) {
			case 'object':
			case 'function':
				break;
			default:
				return [e,j];
		}
		if('constructor' in j&&j.constructor.prototype===j&&j.constructor!==target) {
			console.log('found prototype',j.constructor);
			return ""+`prototype::${j.constructor.name}`;
		}
		if('obj_prop' in j)
			return [e,j];
		if(j.hasOwnProperty("pd_desc_val")) {
			{
				debugger;
			}
			return [e,j];
		}
		if(j.hasOwnProperty("pd_desc_val_inner"))
			return [e,j];
		if(++i>128)
			return [e,j];
		let _prototype=Object.getPrototypeOf(j);
		let r=Object.getOwnPropertyDescriptors(j);
		let res={};
		/** @template {string} U @template {{}} T @template {{[C in U]?: any}} R @arg {T} x @arg {R|null} _q @param {string} v @returns {x is R} */
		function has_key(x,v,_q) {
			return v in x;
		}
		/** @template {{[C in U]?: any}} T @template {string} U @arg {{}|T} obj @arg {U} ns_key @arg {(v:T)=>void} with_fn */
		function define_property_as_value(obj,ns_key,with_fn) {
			/** @type {T|null} */
			let rq=null;
			function grq() {
				return rq;
			}
			Object.defineProperty(obj,ns_key,{
				"configurable": true,
				"enumerable": true,
				"writable": true,
				value: null,
			});
			if(has_key(obj,ns_key,grq())) {
				with_fn(obj);
			}
		}
		for(let j of Object.values(r)) {
			define_property_as_value(j,"pd_desc_val",(/** @type {{pd_desc_val?:boolean}}*/ v) => v.pd_desc_val=true);
			if(j.hasOwnProperty("value")) {
				if(j.value===null) {
					j.value=['box','null',j.value];
					j.value.obj_prop=true;
					continue;
				}
				let inner_prototype=Object.getPrototypeOf(j.value);
				inner_prototype.obj_prop=true;
				let value_properties=Object.getOwnPropertyDescriptors(j.value);
				j.value={inner_value: Object.create(null,value_properties),inner_prototype};
				j.value.obj_prop=true;
				j.value.inner_value.obj_prop=true;
			}
		}
		r.pd_desc_val_inner={value: 2};
		res.pd_desc_val_inner=1;
		res._prototype=_prototype;
		res.property_descriptors=Object.create(null,r);
		return [e,res];
	}
	async function do_all() {
		let json_target_val=function() {};
		let t_obj={value: {map: new Map}};
		debugger;
		let str=JSON.stringify(json_target_val,(e,j) => {
			let new_value;
			let ej=process_one([e,j],json_target_val);
			if(ej[0]==="") {
				new_value={
					map: new Map,
					values: [ej[1]],
				};
				if(!t_obj.value.map.has("")) {
					t_obj.value.map.set("",[new_value]);
				} else {
					let arr=t_obj.value.map.get("");
					arr.push(new_value);
				}
			} else {
				if(!t_obj.value.map.has("")) {
					new_value={
						map: new Map,
						values: [],
					};
					t_obj.value.map.set("",[new_value]);
				}
				let nx_arr=t_obj.value.map.get("");
				console.log(nx_arr,ej[0]);
				let nx=nx_arr[0];
				if(!nx.map.has(ej[0])) {
					nx.map.set(ej[0],{values: [ej[1]]});
				} else {
					nx.map.get(ej[0]).values.push(ej[1]);
				}
			}
			return ej[1];
		}
		);
		console.log('res',str);
		console.log("json parse extended",JSON.parse(str));
		console.log(t_obj);
		// return JSON.parse(str);
	}
	await do_all();
}
export {};
