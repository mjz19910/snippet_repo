export class WeakRefTo<T extends {_0: 0;}> {
	constructor(public key: symbol,public storage_id: number,public id: number,target: T) {
		this.ref=new WeakRef(target);
	}
	ref: WeakRef<T>;
}
