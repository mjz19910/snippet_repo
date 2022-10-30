export function throw_never(value: never) {
	void value
	return new Error("Invalid")
}
