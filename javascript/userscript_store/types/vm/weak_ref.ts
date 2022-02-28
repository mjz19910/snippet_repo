export interface WeakRef<T extends object> {
	readonly [Symbol.toStringTag]: "WeakRef";

	/**
	 * Returns the WeakRef instance's target object, or undefined if the target object has been
	 * reclaimed.
	 */
	deref(): T | undefined;
}