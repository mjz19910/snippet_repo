import {BaseMutationObserver} from "./BaseMutationObserver.js"

export class DetachedMutationObserver extends BaseMutationObserver {
	constructor(target: Node) {
		super()
		let mutationObserver=new MutationObserver(this.callback)
		let options={
			subtree: true,
			childList: true,
			attributes: true,
			attributeOldValue: true,
			characterData: true,
			characterDataOldValue: true,
		}
		mutationObserver.observe(target,options)
		this.observer=mutationObserver
	}
	callback(_mutations: MutationRecord[],observer: MutationObserver): void {
		observer.disconnect()
	}
}
