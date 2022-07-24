export function assume_exclude_type<Y>(value: any|Y): value is Y {
	void value
	return false
}
