export function never_cast<Y>(value: any|Y): value is Y {
	void value
	return false
}
