import {as,as_any} from "/api/v100/as";

/** @template {GenericAPI<API>} API */
export class NSProxyHandler {
	/** @type {API} */
	ns;
	/** @type {WorkerScript} */
	ws;
	/** @type {string[]} */
	tree;
	/** @type {Record<string, unknown>} */
	additionalData;
	/** @type {API} */
	memoed=as({});


	/**
	 * @param {WorkerScript} ws
	 * @param {API} ns
	 * @param {string[]} tree
	 * @param {Record<string, unknown>} additionalData
	 */
	constructor(ws,ns,tree,additionalData) {
		this.ns=ns;
		this.ws=ws;
		this.tree=tree;
		this.additionalData=additionalData;
		Object.assign(this.memoed,additionalData);
	}

	/**
	 * @param {any} __target
	 * @param {PropertyKey} key
	 */
	has(__target,key) {
		return Reflect.has(this.ns,key)||Reflect.has(this.additionalData,key);
	}

	/**
	 * @param {any} __target
	 */
	ownKeys(__target) {
		return [...Reflect.ownKeys(this.ns),...Reflect.ownKeys(this.additionalData)];
	}

	/**
	 * @param {keyof API & string} key
	 * @param {any} __target
	 * @returns {PropertyDescriptor|undefined}
	 */
	getOwnPropertyDescriptor(__target,key) {
		if(!this.has(__target,key)) return undefined;
		return {value: this.get(__target,key,this),configurable: true,enumerable: true,writable: false};
	}

	/**
	 * @param {any} __target
	 * @param {any} __key
	 * @param {any} __attrs
	 * @returns {boolean}
	 */
	defineProperty(__target,__key,__attrs) {
		throw new TypeError("ns instances are not modifiable!");
	}

	/**
	 * @param {any} __target
	 * @param {any} __key
	 * @param {any} __attrs
	 * @returns {boolean}
	 */
	set(__target,__key,__attrs) {
		// Redundant with defineProperty, but we'll be explicit
		throw new TypeError("ns instances are not modifiable!");
	}

	/**
	 * @param {keyof API & string} key
	 * @param {any} __target
	 * @param {this} __receiver
	 * @returns {unknown}
	 */
	get(__target,key,__receiver) {
		const ours=this.memoed[key];
		if(ours) return ours;

		const field=this.ns[key];
		if(!field) return field;

		if(typeof field==="function") {
			const arrayPath=[...this.tree,key];
			const functionPath=arrayPath.join(".");
			const ctx={workerScript: this.ws,function: key,functionPath};
			// Only do the context-binding once, instead of each time the function
			// is called.
			/** @type {any} */
			const func=field(ctx);
			return this.memoed[key]=func;
		}
		if(typeof field==="object") {
			/** @type {InternalAPI<GenericAPI<API[keyof API]>>} */
			let field_c=as_any(field);
			/** @type {{[x:string]: GenericAPI<API[keyof API]>}} */
			let memoed=as_any(this.memoed);
			// GenericAPI<API[keyof API]>
			return ((memoed[key])=NSProxy(
				this.ws,
				field_c,
				[...this.tree,key],
			));
		}
		console.warn(`Unexpected data while wrapping API.`,"tree:",this.tree,"key:",key,"field:",field);
		throw new Error("Error while wrapping netscript API. See console.");
	}
}

/**
 * @template {GenericAPI<API>} API
 * @param {WorkerScript} ws
 * @param {InternalAPI<API>} ns
 * @param {string[]} tree
 * @returns {API}
 */
export function NSProxy(
	ws,
	// InternalAPI<API>
	ns,
	// string[]
	tree,
	// Record<string,unknown>
	additionalData={},
	// API
) {
	const handler=new NSProxyHandler(ws,ns,tree,additionalData);
	// We target an empty Object, so that unproxied methods don't do anything.
	// We *can't* freeze the target, because it would break invariants on ownKeys.
	// API
	return new Proxy({},handler);
}
