/**
 * @type {<T extends {}|{}[]|Map<Mtk, Mtv>,Mtk,Mtv>(v1:T, v2:T)=>boolean} obj_1
 */
export function deep_eq(obj_1,obj_2) {
	if(obj_1===obj_2)
		return true;
	if(obj_1 instanceof Array&&obj_2 instanceof Array) {
		if(obj_1.length===obj_2.length) {
			for(let i=0;i<obj_1.length;i++) {
				let cur=obj_1[i];
				let cur_other=obj_2[i];
				if(!deep_eq(cur,cur_other)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2));
		if(is_eq)
			return true;
		return false;
	}
	if(obj_1 instanceof Map&&obj_2 instanceof Map) {
		return deep_eq([...obj_1.entries()],[...obj_2.entries()]);
	}
	throw new Error("Fixme");
}
