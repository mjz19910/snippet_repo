import {HeldType} from "../HeldType.ts";
import {script_registry} from "../script_registry.ts";
import {Counter} from "../Counter.ts";
import {WeakRefTo} from "../WeakRefTo";
import {UnregisterToken} from "../UnregisterToken";
import {gc_store_counter} from "../gc_store_counter.ts";

export class GCStore<T extends {}> {
	static all_storage: GCStore<{}>[]=[];
	static cleanup_with_held(held: HeldType) {
		for(let i=0;i<GCStore.all_storage.length;i++) {
			let cur_storage=GCStore.all_storage[i];
			if(cur_storage.store_id === held.store_id) {
				cur_storage.cleanup_target_item(held);
			}
		}
	}
	constructor() {
		GCStore.all_storage.push(this);
	}
	store_id=gc_store_counter.next();
	store_gc_object(target: T) {
		let target_ref=this.target_arr.find(e => e!==null&&e.ref.deref()===target);
		if(target_ref) {
			return target_ref.id;
		}
		let id=this.counter.next();
		let key=Symbol(id);
		let store_id=this.store_id;
		let held_value: HeldType={
			type: 'held',
			scope: "object",
			store_id,
			id,
			key
		};
		let unregister_token=new UnregisterToken(key,store_id);
		this.target_arr.push(new WeakRefTo(key,store_id,id,target));
		this.unregister_token_arr.push(unregister_token);
		script_registry.register(target,held_value,unregister_token);
		return id;
	}
	counter=new Counter;
	target_arr: (WeakRefTo<T>|null)[]=[];
	unregister_token_arr: UnregisterToken[]=[];
	has_alive_target(index: number) {
		let target=this.target_arr[index];
		if(!target) return false;
		if(!target.ref.deref()) return false;
		return true;
	}
	get_target_item(index: number) {
		let target=this.target_arr[index];
		if(!target) throw new Error("Failed");
		let ref_target=target.ref.deref();
		if(!ref_target) throw new Error("Failed");
		return ref_target;
	}
	cleanup_target_item(held: HeldType) {
		let held_key=held.key;
		let weak_state_index=this.target_arr.findIndex(e => e&&e.key===held_key);
		if(weak_state_index===-1) {
			console.log('prev gc',held);
		}
		if(weak_state_index>-1) {
			let weak_state=this.target_arr[weak_state_index];
			console.log('gc',weak_state_index,held_key,weak_state);
		} else {
			console.log('gc no target ref',weak_state_index,held_key);
		}
		this.target_arr[weak_state_index]=null;
	}
}
