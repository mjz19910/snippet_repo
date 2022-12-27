export declare class URLSearchParams implements Iterable<[string,string]> {
	constructor(init?: URLSearchParams|string|Record<string,string|ReadonlyArray<string>>|Iterable<[string,string]>|ReadonlyArray<[string,string]>);
	[Symbol.iterator](): IterableIterator<[string,string]>;
	/**
	 * Append a new name-value pair to the query string.
	 */
	append(name: string,value: string): void;
	/**
	 * Remove all name-value pairs whose name is `name`.
	 */
	delete(name: string): void;
	/**
	 * Returns an ES6 `Iterator` over each of the name-value pairs in the query.
	 * Each item of the iterator is a JavaScript `Array`. The first item of the `Array`is the `name`, the second item of the `Array` is the `value`.
	 *
	 * Alias for `urlSearchParams[@@iterator]()`.
	 */
	entries(): IterableIterator<[string,string]>;
}
