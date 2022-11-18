// base Badge, always invalid
declare global {
	interface Badge extends Private.Badge {}
}

export function verify_badge(badge: Badge|undefined) {
	if(!badge) badge_verify_failed();
	if(badge.verify()!==0) badge_verify_failed();
}

namespace Private {
	export class Badge {
		readonly _verify=0;
		verify() {return this._verify;}
	}
}

function badge_verify_failed(): never {
	throw new Error("VERIFY: Badge not passed");
}

export {};