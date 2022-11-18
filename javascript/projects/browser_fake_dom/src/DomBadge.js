import {Badge} from "./Badge.js";

export class DomBadge extends Badge {
	revoke() {
		if(!this.m_validity) {
			throw Error("revoke called on invalid badge");
		}
		this.m_validity=false;
	}
}
