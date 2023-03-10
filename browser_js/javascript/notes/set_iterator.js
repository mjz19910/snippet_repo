function run2() {
	let s_set=new Set([1,2,3]);
	Object.seal(s_set);
	Object.freeze(s_set);
	Object.preventExtensions(s_set);
	s_set.add(4);
	s_set;
	let SetIterator=Object.getPrototypeOf(s_set.entries());
	SetIterator.collect=function() {
		let results=[],cur=this.next();
		while(!cur.done) {
			results.push(cur.value);
			cur=this.next();
		}
		return results;
	};
	/** @private @template U @template T @arg {U} e @arg {any} [x] @returns {T} */
	function as_any(e,x=e) {return x;}

	/**
	 * @this {{}}
	 */
	function IteratorBase() {this;}
	IteratorBase.prototype=SetIterator;
	/** @type {{new <T>(): IterableIterator<T,undefined>}} */
	const iteratorBaseValue=as_any(IteratorBase);

	/** @template T,U @implements {IterableIterator<T>} */
	class SetIteratorMapExtensionBase extends iteratorBaseValue {
		/** @arg {IterableIterator<T>} base @arg {(x: T) => U} mapper */
		constructor(base,mapper) {
			super();
			this.base=base;
			this.mapper=mapper;
		}
		next() {
			let iter=this.base.next();
			if(iter.done) return {
				done: true,
				value: iter.value,
			};
			return {
				done: false,
				value: this.mapper(iter.value)
			};
		}
		[Symbol.iterator]() {
			return this;
		}
	}
	/** @typedef {{t:"n"}} None */
	/** @template T @typedef {{t:"s",v:T}} Some */
	/** @template T,I_Ret @implements {IterableIterator<T,I_Ret>} */
	class SetIteratorMapExtension extends iteratorBaseValue {
		/** @type {IteratorResult<T, I_Ret>|null} */
		cache_iter=null;
		/** @returns {T[]} */
		collect() {
			let results=[],iter_result=this.next();
			while(!iter_result.done) {
				results.push(iter_result.value);
				iter_result=this.next();
			}
			return results;
		}
		/** @returns {Some<I_Ret>|None} */
		last() {
			let cur;
			if(this.cache_iter) {
				cur=this.cache_iter;
			} else {
				cur=this.next();
			}
			if(cur.done) return {t: "s",v: cur.value};
			return {t: "n"};
		}
		/** @returns {IteratorResult<T,I_Ret>} */
		next() {
			if(this.cache_iter) {
				let cache=this.cache_iter;
				this.cache_iter=null;
				return cache;
			}
			return super.next();
		}
		/** @template R @arg {(x: T) => R} mapper @returns {SetIteratorMapExtension<R,I_Ret>} */
		map(mapper) {
			const t=this;
			let w_base=new SetIteratorMapExtensionBase(t,mapper);
			w_base;
			class CustomIterator extends SetIteratorMapExtension {
				/** @returns {IteratorResult<R,I_Ret>} */
				next() {
					let iter=t.next();
					if(iter.done) {
						return {
							done: true,
							value: iter.value,
						};
					}
					return {
						done: false,
						value: mapper(iter.value)
					};
				}
				[Symbol.iterator]() {
					return this;
				}
			}
			return new CustomIterator();
		}
		[Symbol.iterator]() {
			return this;
		}
	}
	SetIterator.map=SetIteratorMapExtension.prototype.map;

	/** @type {SetIteratorMapExtension<[number,number],undefined>} */
	let setEntriesIterator=as_any(s_set.entries());

	let mr=setEntriesIterator.map((x) => x[0]);

	let rr=mr.collect();
	console.log(rr);
	return mr.last();
}
run2();
