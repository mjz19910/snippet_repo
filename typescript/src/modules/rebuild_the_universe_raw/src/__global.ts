declare global {
	interface Window {
		$?: {};
	}

	interface Document {
		stop(): void;
	}
}

export {}
