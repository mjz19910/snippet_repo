export function remove_optional<T>(v?: T): T {
	if(v===undefined)
		throw new Error("Bad")
	return v
}
