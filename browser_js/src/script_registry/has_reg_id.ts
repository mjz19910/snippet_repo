export function has_reg_id<T extends Record<string,never>>(v: T): v is T&{reg_id: number;} {
	return Object.prototype.hasOwnProperty.call(v,"reg_id");
}