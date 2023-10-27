// deno-lint-ignore-file
export class Seen {
	static debug=false;
	static all_seen_objs: any[]=[]
	static all_seen_map=new Map
	static seen_gen_counter=1
	static seen_uid_counter=0
	static as_any(value: null) {
		let weak_info,ret
		const [instance_index,instance_gen,ref_obj]=this.see_value(value)
		const index_key=instance_index+"@"+instance_gen
		if(this.debug)
			console.log('any',index_key,value)
		value=null
		if(this.all_seen_map.has(index_key)) {
			weak_info=this.all_seen_map.get(index_key)
			ret=weak_info.deref()
			if(ret!==null) {
				return ret
			}
		}
		let obj_id=this.seen_uid_counter
		this.seen_uid_counter++
		ret={
			type: 'any',
			any_key: index_key,
			obj_id,
		}
		weak_info=new WeakRef(ret)
		ref_obj.info=weak_info
		this.all_seen_map.set(index_key,weak_info)
		return ret
	}
	static as_callable(value: Function|null) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value)
		value=null
		const index_key=instance_index+"@"+instance_gen
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key)
			if(this.debug)
				console.log('get callable',index_key,seen_info.deref())
			if(seen_info.deref()!==null)
				return seen_info.deref()
		}
		let obj_id=this.seen_uid_counter
		this.seen_uid_counter++
		let ret={
			type: 'callable',
			fn_index_key: index_key,
			obj_id
		}
		let weak_info=new WeakRef(ret)
		ref_obj.info=weak_info
		this.all_seen_map.set(index_key,weak_info)
		return ret
	}
	static as_constructor(value: null) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value)
		value=null
		const index_key=instance_index+"@"+instance_gen
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key)
			if(this.debug)
				console.log('get constructor',index_key,seen_info.deref())
			if(seen_info.deref()!==null)
				return seen_info.deref()
		}
		let obj_id=this.seen_uid_counter
		this.seen_uid_counter++
		let ret={
			type: 'constructor',
			constructor_key: index_key,
			obj_id
		}
		let weak_info=new WeakRef(ret)
		ref_obj.info=weak_info
		this.all_seen_map.set(index_key,weak_info)
		return ret
	}
	static as_instance(instance: {}|null,prototype_info: {constructor_tag: any; prototype_tag: any}) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(instance)
		instance=null
		const index_key=instance_index+"@"+instance_gen
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key)
			if(this.debug)
				console.log('get instance',index_key,seen_info.deref())
			if(seen_info.deref()!==null)
				return seen_info.deref()
		}
		let obj_id=this.seen_uid_counter
		this.seen_uid_counter++
		let ret={
			type: 'instance',
			index_key,
			prototype_info,
			obj_id
		}
		let weak_info=new WeakRef(ret)
		ref_obj.info=weak_info
		this.all_seen_map.set(index_key,weak_info)
		return ret
	}
	static see_value(value: any) {
		let index=this.seen_index_of(value)
		iz: if(index>-1) {
			let ref_obj_seen=this.all_seen_objs[index]
			let ref_obj=ref_obj_seen.ref.deref()
			if(ref_obj===null)
				break iz
			return [index,this.seen_gen_counter,ref_obj]
		}
		let ref_obj={
			ref: new WeakRef(value)
		}
		index=this.all_seen_objs.push(ref_obj)-1
		return [index,this.seen_gen_counter,ref_obj]
	}
	static seen_index_of(value: any) {
		let arr=this.all_seen_objs
		let index=-1
		let remove_cnt=0
		for(let i=0;i<arr.length;i++) {
			let obj=arr[i]
			let ref=obj.ref
			let item=ref.deref()
			if(item===null) {
				remove_cnt++
				continue
			}
			if(item===value) {
				index=i
				break
			}
		}
		if(remove_cnt>arr.length/4) {
			let new_arr=[]
			this.seen_gen_counter++
			for(let i=0;i<arr.length;i++) {
				let obj=arr[i]
				let ref=obj.ref
				let item=ref.deref()
				if(item===null)
					continue
				new_arr.push(obj)
			}
			this.all_seen_objs=new_arr
			index=this.seen_index_of(value)
		}
		return index
	}
}
