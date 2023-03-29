export class WeakRefTo<T extends {}> {
	constructor(public key: symbol, public storage_id: number, public id: number, target: T) {
		this.ref=new WeakRef(target);
	}
	ref: WeakRef<T>;
};
