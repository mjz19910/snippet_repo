export function assume_not_type<Y>(value: {}|Y): value is Y {
	void value
	return false
}
