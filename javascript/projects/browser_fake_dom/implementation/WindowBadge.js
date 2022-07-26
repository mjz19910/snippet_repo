import {FakeWindow} from "../mod.js"
import {Badge} from "../std/Badge.js"
export class FakeWindowBadge extends Badge {
	m_has_error=false
	/**@type {Error|null} */
	m_failure_reason=null
	/**
	 * @param {FakeWindow} window
	 */
	constructor(window) {
		super()
		if(window.document) {
			this.m_has_error=true
			this.m_failure_reason=new Error("Window already has a document attached")
		}
	}
	is_valid() {
		return !this.m_has_error
	}
	create_validation_error() {
		if(this.m_failure_reason===null) {
			return super.create_validation_error()
		} else {
			return this.m_failure_reason
		}
	}
}
