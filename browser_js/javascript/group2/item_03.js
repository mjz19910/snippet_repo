function main() {
	class curTy {
		constructor() {
			/** @type {string[]} */
			this.keys=[];
			/** @type {(()=>void)[]} */
			this.values=[];
			this.lastKey="";
			this.lastValue=() => {};
		}
		get k() {
			return this.lastKey;
		}
		set k(key) {
			this.lastKey=key;
		}
		get v() {
			return this.lastValue;
		}
		set v(value) {
			this.lastValue=value;
			this.commit();
		}
		commit() {
			this.set(this.lastKey,this.lastValue);
		}
		/** @param {string} key  */
		keyIndexOf(key) {
			return this.keys.indexOf(key);
		}
		/**
		 * @param {string} key
		 * @param {()=>void} value
		 */
		set(key,value) {
			if(this.keys.indexOf(key)>-1) {
				throw Error("Duplicate key");
			}
			this.keys.push(key);
			this.values.push(value);
		}
		/** @param {number} id */
		run(id) {
			var key=this.keys[id];
			var value=this.values[id];
			console.log("running",key);
			return value();
		}
		/** @param {number} id */
		execute(id) {
			return this.run(id);
		}
	}
	let cur=new curTy;
	cur.k='start';
	cur.v=function() {
		console.log('start');
		return 'done';
	};
	let target_id=0;
	return cur.execute(target_id);
}
main();
