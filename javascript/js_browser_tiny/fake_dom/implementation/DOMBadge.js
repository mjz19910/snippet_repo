import {Badge} from "../std/Badge.js";
export class DOMBadge extends Badge {
	m_validity = true;
	is_null_badge=false;
	is_valid() {
		return this.m_validity;
	}
	revoke() {
		if(!this.is_valid()) {
			throw Error("revoke called on invalid badge");
		}
		this.m_validity = false;
	}
}
