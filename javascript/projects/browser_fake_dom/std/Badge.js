export class Badge {
	is_valid() {
		return false;
	}
	is_null_badge=false;
	create_validation_error() {
		return new Error("Badge is invalid");
	}
}
