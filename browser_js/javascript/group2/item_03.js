function main() {
	let asyncFunctionNOP=async function() {};
	let AsyncFunctionPrototype=Object.getPrototypeOf(asyncFunctionNOP);
	let AsyncFunction=AsyncFunctionPrototype.constructor;
	class curTy {
		constructor() {
			/** @type {string[]} */
			this.keys=[];
			/** @type {(()=>void)[]} */
			this.values=[];
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
		/** @param {string} key  */
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
		/** @param {number} id */
		execute_async(id) {
			var key=this.keys[id];
			var value=this.values[id];
			console.log("running async",key);
			let ret=value();
			ret.then(null,e => console.error(e));
			return ret;
		}
		/** @param {number} id */
		is_async(id) {
			if(this.values[id] instanceof AsyncFunction) {
				return true;
			}
			return false;
		}
	}
	let cur=new curTy;
	cur.k='ptd-qq101';
	cur.v=function() {
		console.clear();
		if(window.__state) {
			let old_state=window.__state;
			if(old_state.dispose) {
				old_state.dispose();
			}
		}
		let t={};
		window.__state=t;
		{
			let rng_num=Math.random();
			let used_random_nibbles=0;
			function rng_hex_byte() {
				let rng_size=1<<8;
				let num;
				if(used_random_nibbles==11) {
					num=~~(rng_num*rng_size);
					used_random_nibbles+=2;
					rng_num*=rng_size;
					rng_num-=num;
					console.log('z',rng_num,used_random_nibbles);
					rng_num=Math.random();
					used_random_nibbles=0;
				} else if(used_random_nibbles==12) {
					let nib_size=1<<4;
					let num_0=~~(rng_num*nib_size);
					used_random_nibbles++;
					rng_num*=rng_size;
					rng_num-=num_0;
					console.log('z',rng_num,used_random_nibbles);
					rng_num=Math.random();
					used_random_nibbles=0;
					let num_1=~~(rng_num*nib_size);
					used_random_nibbles++;
					rng_num*=rng_size;
					rng_num-=num_1;
					num=num_1+num_0*16;
					rng_size=1<<8;
				} else {
					num=~~(rng_num*rng_size);
					used_random_nibbles+=2;
					rng_num*=rng_size;
					rng_num-=num;
				}
				return (rng_size+num).toString(16).slice(1);
			}
			let rng_bytes=Array(5).fill(rng_hex_byte).map(e => e());
			console.log('__x_'+rng_bytes.join('')+'_r');
		}
	};
	cur.k='async';
	cur.v=async function() {
		console.log('async');
		return 'async done';
	};
	cur.k='start';
	cur.v=function() {
		console.log('start');
		return 'done';
	};
	let target_id=0;
	if(cur.is_async(target_id)) {
		return cur.execute_async(target_id);
	}
	return cur.execute(target_id);
}
main();
