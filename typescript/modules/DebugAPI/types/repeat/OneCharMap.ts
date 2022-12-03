class S<K,V> extends Map<K,V> {
	__key: "test"="test";
	static from<K,V>(start: S<K,V>) {
		let res_ent: [K,V][]=[];
		for(let i of start.entries()) {
			if(i[1] instanceof S) {
				res_ent.push([i[0],i[1]]);
			} else if(i[1] instanceof Map) {
				let [a,b]=i;
				res_ent.push([a,b]);
			}
		}
		return new S<K,V>(res_ent);
	}
}

export type one_char_type_for_S=S<number,number>['__key'];
