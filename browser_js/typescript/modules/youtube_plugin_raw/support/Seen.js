export class Seen {
	static debug=false;
	/**
	 * @type {any[]}
	 */
	static all_seen_objs=[];
	static all_seen_map=new Map;
	static seen_gen_counter=1;
	static seen_uid_counter=0;
	/**
	 * @param {null} value
	 */
	static as_any(value) {
		let weak_info,ret;
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		const index_key=instance_index+"@"+instance_gen;
		if(this.debug) console.log('any',index_key,value);
		value=null;
		if(this.all_seen_map.has(index_key)) {
			weak_info=this.all_seen_map.get(index_key);
			ret=weak_info.deref();
			if(ret!==null) {
				return ret;
			}
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		ret={
			type: 'any',
			any_key: index_key,
			obj_id,
		};
		weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @param {Function|null} value
	 */
	static as_callable(value) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		value=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log('get callable',index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: 'callable',
			fn_index_key: index_key,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @param {null} value
	 */
	static as_constructor(value) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		value=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log('get constructor',index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: 'constructor',
			constructor_key: index_key,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @param {{} | null} instance
	 * @param {{ constructor_tag: any; prototype_tag: any; }} prototype_info
	 */
	static as_instance(instance,prototype_info) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(instance);
		instance=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log('get instance',index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: 'instance',
			index_key,
			prototype_info,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @param {any} value
	 */
	static see_value(value) {
		let index=this.seen_index_of(value);
		iz: if(index>-1) {
			let ref_obj_seen=this.all_seen_objs[index];
			let ref_obj=ref_obj_seen.ref.deref();
			if(ref_obj===null) break iz;
			return [index,this.seen_gen_counter,ref_obj];
		}
		let ref_obj={
			ref: new WeakRef(value)
		};
		index=this.all_seen_objs.push(ref_obj)-1;
		return [index,this.seen_gen_counter,ref_obj];
	}
	/**
	 * @param {any} value
	 */
	static seen_index_of(value) {
		let arr=this.all_seen_objs;
		let index=-1;
		let remove_cnt=0;
		for(let i=0;i<arr.length;i++) {
			let obj=arr[i];
			let ref=obj.ref;
			let item=ref.deref();
			if(item===null) {
				remove_cnt++;
				continue;
			}
			if(item===value) {
				index=i;
				break;
			}
		}
		if(remove_cnt>arr.length/4) {
			let new_arr=[];
			this.seen_gen_counter++;
			for(let i=0;i<arr.length;i++) {
				let obj=arr[i];
				let ref=obj.ref;
				let item=ref.deref();
				if(item===null) continue;
				new_arr.push(obj);
			}
			this.all_seen_objs=new_arr;
			index=this.seen_index_of(value);
		}
		return index;
	}
}
