export class DelPropertiesState {
	#define_property=Object.defineProperty;
	/**@type {Map<any, [string, TypedPropertyDescriptor<any> & PropertyDescriptor][]>}*/
	remove_map=new Map;
	/**@type {any[]}*/
	new_cache=[];
	/**@type {any[]}*/
	new_del=[];
	/**@type {any[]}*/
	del_parents=[];
	/** @type {any} */
	cur;
	/** @type {any} */
	ctx_req;
	del_undo_cur=0;
	del_undo_init() {
		this.del_undo_start=this.del_parents.length;
		this.del_undo_cur=this.del_undo_start;
	}
	/** @param {() => void} fn */
	del_undo_until_ok(fn) {
		let is_ok=false;
		while(!is_ok) {
			try {
				fn();
				is_ok=true;
			} catch {
				this.del_undo();
			}
		}
	}
	del_undo() {
		if(this.del_undo_cur<0) throw new Error("del undo underflow");
		this.del_undo_cur--;
		let undo_item=this.del_parents[this.del_undo_cur];
		this.#define_property(undo_item[0],undo_item[1],undo_item[2]);
	}
}
