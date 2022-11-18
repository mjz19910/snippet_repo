// base Badge, always invalid
export class Badge {
	/**
	 * @param {Badge|undefined} badge
	 */
	static verify(badge) {
		if(!badge) throw create_missing_badge_err();
		if(!badge.m_validity) throw create_validation_err();
		badge.verify();
	}
	/**@type {0} */
	#verify=0;
	verify() {
		return this.#verify === 0;
	}
	/**@type {boolean|undefined} */
	m_validity=true;
}
function create_validation_err() {
	return new Error("Badge is invalid");
}
function create_missing_badge_err() {
	return new Error("Badge is missing");
}
function create_wrong_prototype_err() {
	return new Error("Badge prototype is invalid");
}
