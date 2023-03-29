function run2() {
	let s_set=new Set([1,2,3]);
	Object.seal(s_set);
	Object.freeze(s_set);
	Object.preventExtensions(s_set);
	s_set.add(4);
	s_set;
	let SetIterator: Iterator<[any,any]>&{
		collect(): [any,any][];
		map<U>(func: (x: [any,any]) => U): Iterator<U>;
	}=Object.getPrototypeOf(s_set.entries());
	SetIterator.collect=function() {
		let results=[],cur=this.next();
		while(!cur.done) {
			results.push(cur.value);
			cur=this.next();
		}
		return results;
	};

	function IteratorBase(this: {}) {this;}

	IteratorBase.prototype=SetIterator;

	const iteratorBaseValue=IteratorBase as any as new (...args: any[]) => any;
	class SetIteratorMapExtensionBase<T,U> extends iteratorBaseValue implements IterableIterator<T> {
		constructor(mapper: (x: T) => U) {
			super();
			this.mapper=mapper;
		}
		next() {
			let iter=super.next();
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
	class SetIteratorMapExtension<T> extends iteratorBaseValue implements IterableIterator<T>  {
		collect(): T[] {
			let results=[],cur=this.next();
			while(!cur.done) {
				results.push(cur.value);
				cur=this.next();
			}
			return results;
		}
		next(): IteratorResult<T> {
			return super.next();
		}
		map<R>(mapper: (x: T) => R): SetIteratorMapExtension<R> {
			const t=this;
			let w_base=new SetIteratorMapExtensionBase(mapper);
			w_base;
			class CustomIterator extends SetIteratorMapExtension<R> {
				override next() {
					let iter=t.next();
					if(iter.done) {
						console.log("done",iter);
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

	let setEntriesIterator=s_set.entries() as SetIteratorMapExtension<[number,number]>;

	let mr=setEntriesIterator.map((x) => x[0]);

	let rr=mr.collect();
	return rr;
}
run2();


