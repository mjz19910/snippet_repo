//** @arg {HTMLLexerState} obj */
// export function ctx_exec(obj) {
export function ctx_exec() {
	//	const code=`
	//** @this {globalThis}*/
	//(function() {
	const obj_define_property=Object.defineProperty;
	const obj_own_props=Object.getOwnPropertyDescriptors;
	const arr_includes=Array.prototype.includes;
	const reflect_apply=Reflect.apply;
	const map_has=Map.prototype.has;
	const map_get=Map.prototype.get;
	const map_prototype_set=Map.prototype.set;
	const error_constructor=Error;
	const obj_entries=Object.entries;
	const obj_proto_of=Object.getPrototypeOf;
	const obj_has_own_property=Object.hasOwnProperty;
	/** @arg {DelPropertiesState} state @arg {any[][]} cc @arg {string} key @arg {(TypedPropertyDescriptor<any> & PropertyDescriptor)} property_descriptor @arg {any} obj */
	function del_all_properties_1(state,obj,cc,key,property_descriptor) {
		const s=state;
		const debug=false;
		s.del_parents.push([obj,key,property_descriptor]);
		s.del_objs.push(obj);
		cc.push([obj,key,property_descriptor.value]);
		x: try {
			if(reflect_apply(obj_has_own_property,property_descriptor,['value'])) {
				if(debug) console.log('del_all_properties_1_tag 1',key,property_descriptor);
				break x;
			}
			if(property_descriptor.get&&property_descriptor.set) {
				if(debug) console.log('del_all_properties_1_tag 2',key,property_descriptor.get,property_descriptor.set);
				break x;
			}
			if(property_descriptor.get) {
				console.log('del_all_properties_1_tag 3',key,property_descriptor.get);
			}
			if(property_descriptor.set) {
				console.log('del_all_properties_1_tag 4',key,property_descriptor.set);
			}
		} catch(e) {
			e;
			let undo_try_fn=() => console.log('del',key,property_descriptor);
			s.del_undo_init();
			s.del_undo_until_ok(undo_try_fn);
		}
		if(property_descriptor.value===void 0)
			return;
		if(!s.new_cache.includes(property_descriptor.value)) {
			s.new_cache.push(property_descriptor.value);
			s.new_del.push(property_descriptor.value);
		}
	}

	// del_all_properties
	/** @arg {DelPropertiesState} state@arg {any} tq */
	function del_all_properties(state,tq) {
		while(tq) {
			/** @type {[string, TypedPropertyDescriptor<any> & PropertyDescriptor][]}*/
			let cc;
			if(reflect_apply(map_has,state.remove_map,[tq])) {
				let v=reflect_apply(map_get,state.remove_map,[tq]);
				if(!v)
					throw new error_constructor("Unreachable");
				cc=v;
			} else {
				cc=[];
				reflect_apply(map_prototype_set,state.remove_map,[tq,cc]);
			}
			for(let k of obj_entries(obj_own_props(tq))) {
				if(k[1].configurable) {
					if(reflect_apply(arr_includes,state.ctx_req,[k[1].value]))
						continue;
					delete tq[k[0]];
					del_all_properties_1(state,tq,cc,...k);
				} else {
					if(k[1].writable) {
						tq[k[0]]=void 0;
						del_all_properties_1(state,tq,cc,...k);
					}
				}
			}
			tq=obj_proto_of(tq);
		}
	}
	class DelPropertiesState {
		/** @type {Map<any, [string, TypedPropertyDescriptor<any> & PropertyDescriptor][]>}*/
		remove_map=new Map;
		/** @type {any[]}*/
		new_cache=[];
		/** @type {any[]}*/
		new_del=[];
		/** @type {any[]}*/
		del_parents=[];
		/** @type {any[]}*/
		del_objs=[];
		/** @type {any} */
		cur;
		/** @type {any} */
		ctx_req;
		del_undo_init() {
			this.del_undo_start=this.del_parents.length;
			this.del_undo_cur=this.del_undo_start;
		}
		/** @arg {() => void} fn */
		del_undo_until_ok(fn) {
			let is_ok=false;
			let count=0;
			try {
				fn();
				return;
			} catch {}
			while(!is_ok) {
				this.del_undo();
				try {
					fn();
					is_ok=true;
				} catch {
					count++;
				}
			}
			count;
		}
		del_undo() {
			if(this.del_undo_cur==void 0) return;
			if(this.del_undo_cur<0) throw new Error("del undo underflow");
			this.del_undo_cur--;
			let undo_item=this.del_parents[this.del_undo_cur];
			obj_define_property(undo_item[0],undo_item[1],undo_item[2]);
		}
	}
	let s=new DelPropertiesState;
	/** @type {Array<any>['pop']}*/
	const arr_prototype_pop=Array.prototype.pop;
	const map_proto=Map.prototype;
	map_proto;
	const prev_UintArr=Uint8Array;
	const prev_Buffer=Buffer;
	const prev_Array_proto=Array.prototype;
	prev_Array_proto;
	/** @type {any}*/
	let ws_t=global;
	/** @type {Window&typeof globalThis}*/
	const window_saved=ws_t;
	s.cur=window_saved;
	s.ctx_req=[s,console];
	console.log('ctx_exec ce',window_saved);
	del_all_properties(s,s.cur);
	const fn_start_undo=function() {
		let undo_try_fn=() => console.log('undo test');
		s.del_undo_init();
		s.del_undo_until_ok(undo_try_fn);
	};
	while(s.new_del.length>0) {
		let xx=reflect_apply(arr_prototype_pop,s.new_del,[]);
		s.cur=xx;
		let pl=s.new_del.length;
		del_all_properties(s,xx);
		let al=s.new_del.length;
		try {
			console.log('pd',al-pl);
		} catch {
			fn_start_undo();
			console.log('pd',al-pl);
		}
	}
	console.log('s.cur',s.cur);
	window_saved.Uint8Array=prev_UintArr;
	window_saved.Buffer=prev_Buffer;
}
