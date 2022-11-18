import {BadgeRegistry} from "./BadgeRegistry.js";

export class BaseBadge {
	/** @readonly */ _verify=0;
	verify() {return this._verify;}
	constructor() {
		BadgeRegistry.register(this);
	}
}
