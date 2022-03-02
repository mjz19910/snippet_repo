import {BaseMutationObserver} from "./BaseMutationObserver";

export class LoadMutationObserver extends BaseMutationObserver {
	/**
	 * @param {Node} target
	 * @param {(mut_vec: MutationRecord[], mut_observer: MutationObserver) => void} callback
	 */
	constructor(target, callback) {
		super();
		this.m_callback = callback;
		let mutationObserver = new MutationObserver(this.callback.bind(this));
		let options = {
			childList: true,
			subtree: true
		};
		mutationObserver.observe(target, options);
		this.observer = mutationObserver;
	}
	/** @type {MutationCallback} */
	callback(mutations, observer) {
		this.m_callback(mutations, observer);
		observer.disconnect();
	}
}
