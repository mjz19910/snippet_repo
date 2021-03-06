import {GenericDataEvent} from "types/vm/GenericDataEvent"

declare global {
	interface Window {
		DebugAPI: {}
		GenericDataEvent: typeof GenericDataEvent
	}
	interface String {
		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
		 */
		replaceAll(searchValue: string|RegExp,replaceValue: string): string

		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replacer A function that returns the replacement text.
		 */
		replaceAll(searchValue: string|RegExp,replacer: (substring: string,...args: any[]) => string): string
	}
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef"

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T|undefined
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>
	}

	var WeakRef: WeakRefConstructor

	interface FinalizationRegistry<T> {
		readonly [Symbol.toStringTag]: "FinalizationRegistry"

		/**
		 * Registers an object with the registry.
		 * @param target The target object to register.
		 * @param heldValue The value to pass to the finalizer for this object. This cannot be the
		 * target object.
		 * @param unregisterToken The token to pass to the unregister method to unregister the target
		 * object. If provided (and not undefined), this must be an object. If not provided, the target
		 * cannot be unregistered.
		 */
		register(target: object,heldValue: T,unregisterToken?: object): void

		/**
		 * Unregisters an object from the registry.
		 * @param unregisterToken The token that was used as the unregisterToken argument when calling
		 * register to register the target object.
		 */
		unregister(unregisterToken: object): void
	}

	interface FinalizationRegistryConstructor {
		readonly prototype: FinalizationRegistry<any>

		/**
		 * Creates a finalization registry with an associated cleanup callback
		 * @param cleanupCallback The callback to call after an object in the registry has been reclaimed.
		 */
		new <T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T>
	}

	var FinalizationRegistry: FinalizationRegistryConstructor
}
