import {BaseMutationObserver} from "./BaseMutationObserver";

export class DetachedMutationObserver extends BaseMutationObserver {
	/** @param {Node} target */
	constructor(target) {
		super();
		let mutationObserver = new MutationObserver(this.callback);
		let options = {
			subtree: true,
			childList: true,
			attributes: true,
			attributeOldValue: true,
			characterData: true,
			characterDataOldValue: true,
		};
		mutationObserver.observe(target, options);
		this.observer = mutationObserver;
	}
	/** @type {(_mutations: MutationRecord[], observer: MutationObserver & {observer_state?:1|2})=>void} */
	callback(_mutations, observer) {
		observer.disconnect();
	}
}
