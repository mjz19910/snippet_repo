export class IterExtensions {
	constructor() {
		let map=new Map;
		let val_iter=map.values();
		let proto=Object.getPrototypeOf(val_iter);
		proto.map=function(/** @type {(arg0: any) => any} */ func) {
			let t=this;
			function next() {
				let iter=t.next();
				if(iter.done)
					return iter;
				iter.value=func(iter.value);
				return iter;
			}
			return {
				next,
				[Symbol.iterator]() {
					return this;
				}
			};
		};
	}
}
