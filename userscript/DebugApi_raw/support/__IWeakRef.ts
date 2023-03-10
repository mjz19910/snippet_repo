interface WeakRef<T extends object> {
	readonly [Symbol.toStringTag]: "WeakRef";
	deref(): T|undefined;
}
