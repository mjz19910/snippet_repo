// base Badge, always invalid
export class Badge {
	/**
	 * @param {Badge|undefined} badge
	 */
	static verify(badge) {
		if(!badge) throw Badge.create_missing_badge_err();
		if(!badge.is_valid) throw badge.create_validation_err();
		badge.invalidate();
	}
	m_valid=false;
	invalidate() {
		this.m_valid=false;
	}
	is_valid() {
		return this.m_valid;
	}
	is_null_badge=false;
	create_validation_err() {
		return new Error("Badge is invalid");
	}
	static create_missing_badge_err() {
		return new Error("Badge is missing");
	}
}
