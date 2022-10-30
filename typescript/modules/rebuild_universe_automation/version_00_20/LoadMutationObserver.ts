import {BaseMutationObserver} from "./BaseMutationObserver"

export class LoadMutationObserver extends BaseMutationObserver {
	m_callback: MutationCallback
	constructor(target: Node,callback: MutationCallback) {
		super()
		this.m_callback=callback
		let mutationObserver=new MutationObserver(this.callback.bind(this))
		let options={
			childList: true,
			subtree: true
		}
		mutationObserver.observe(target,options)
		this.observer=mutationObserver
	}
	callback(mutations: MutationRecord[],observer: MutationObserver) {
		this.m_callback(mutations,observer)
		observer.disconnect()
	}
}
