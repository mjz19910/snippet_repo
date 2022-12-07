export interface IHashMap<K,V> {
	clear(): void;
	is_empty(): boolean;
	get(key: K): V|undefined;
	has(key: K): boolean;
	set(key: K,value: V): this;
}
