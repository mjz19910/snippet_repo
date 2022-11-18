// base Badge, always invalid
export class Badge {
	/**
	 * @param {Badge|{}|undefined} badge
	 */
	static verify(badge) {
		if(!badge) throw create_missing_badge_err();
		if(badge instanceof Badge) {
			if(!badge.is_valid) throw create_validation_err();
			if(!badge.is_valid()) throw create_validation_err();
		}
		throw create_wrong_prototype_err();
	}
	/**@type {undefined|(()=>true)} */
	is_valid=() => true;
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
