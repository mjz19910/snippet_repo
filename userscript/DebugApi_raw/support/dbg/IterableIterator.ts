export interface IterableIterator<T> {
	map<U>(func: (value: T) => U): IterableIterator<U>;
}
