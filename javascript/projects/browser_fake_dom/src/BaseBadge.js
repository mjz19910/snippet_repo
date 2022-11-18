export class BaseBadge {
	/** @readonly */ _verify=0;
	verify() {return this._verify;}
	constructor() {
		if(!globalThis.badge_registry) throw new Error("");
		globalThis.badge_registry.register(this);
	}
}
