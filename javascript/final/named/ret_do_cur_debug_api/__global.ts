declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
	}
}

export interface Holder {
	use(): void;
}
