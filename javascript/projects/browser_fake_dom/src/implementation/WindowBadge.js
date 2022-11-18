import {FakeWindow} from "../FakeWindow.js";
import {Badge} from "../Badge.js/index.js"
import {DomBadge} from "./DomBadge.js";
export class FakeWindowBadge extends Badge {
	m_has_error=false
	/**@type {Error|null} */
	m_failure_reason=null
	/**
	 * @param {FakeWindow} window
	 */
	constructor(window) {
		super()
		if(window.has_document(new DomBadge)) {
			this.m_has_error=true;
			this.m_failure_reason=new Error("Window already has a document attached");
		}
	}
	is_valid() {
		return !this.m_has_error
	}
	create_validation_err() {
		if(this.m_failure_reason===null) {
			return super.create_validation_err()
		} else {
			return this.m_failure_reason
		}
	}
}
