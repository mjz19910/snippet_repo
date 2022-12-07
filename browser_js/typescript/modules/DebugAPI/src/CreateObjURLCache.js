/**
 * @param {[Blob | MediaSource]} args
 */
function createObjectURL(...args) {
	let ret=CreateObjURLCache.originalScope.createObjectURL(...args);
	CreateObjURLCache.cache.set(ret,[args,ret,true]);
	return ret;
}
/**
 * @param {[string]} args
 */
function revokeObjectURL(...args) {
	let key=args[0];
	let cache_value=CreateObjURLCache.cache.get(key);
	CreateObjURLCache.cache.delete(key);
	if(cache_value) {
		CreateObjURLCache.expired.push(cache_value);
	}
	let ret=CreateObjURLCache.originalScope.revokeObjectURL(...args);
	return ret;
}

export class CreateObjURLCache {
	/** @readonly */
	static originalScope={
		createObjectURL: URL.createObjectURL,
		revokeObjectURL: URL.revokeObjectURL,
	};
	/**
	 * @type {[(Blob | MediaSource)[], string, boolean][]}
	 */
	static expired=[];
	/**@type {Map<string, [(Blob | MediaSource)[], string, boolean]>} */
	static cache=new Map;
	enable() {
		this.update_scope(this.getScope());
	}
	disable() {
		this.update_scope(CreateObjURLCache.originalScope);
	}
	/**
	 * @param {CreateObjURLCache.originalScope} scope
	 */
	update_scope(scope) {
		URL.createObjectURL=scope.createObjectURL;
		URL.revokeObjectURL=scope.revokeObjectURL;
	}
	getScope() {
		/**@type {CreateObjURLCache.originalScope} */
		let scope={createObjectURL,revokeObjectURL};
		return scope;
	}
}
