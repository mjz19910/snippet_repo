// base Badge, always invalid
export class Badge {
	m_valid=false;
	invalidate() {
		this.m_valid = false;
	}
	is_valid() {
		return this.m_valid;
	}
	is_null_badge=false;
	create_validation_error() {
		return new Error("Badge is invalid");
	}
}
