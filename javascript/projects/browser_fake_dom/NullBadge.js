export class NullBadge {
	is_valid() {
		return true;
	}
	is_null_badge = true;
	create_validation_error() {
		return new Error("Not used");
	}
}
