declare global {
	interface Window {
		$: JQueryStatic | undefined;
	}

	interface Document {
		stop(): void;
	}
}

export {}
