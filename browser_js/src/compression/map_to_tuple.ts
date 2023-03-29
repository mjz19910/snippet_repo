export function map_to_tuple<T,X>(e: T[],i: X[],v: number): [T,X] {
	return [e[v],i[v]]
}
