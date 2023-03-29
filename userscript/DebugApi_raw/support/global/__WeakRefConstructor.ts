interface WeakRefConstructor {
	readonly prototype: WeakRef<any>;
	new <T extends object>(target: T): WeakRef<T>;
}
