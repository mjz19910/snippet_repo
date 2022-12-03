declare global {
	namespace setTimeout {
		const __promisify__: null;
	}

	namespace setInterval {
		const __promisify__: null;
	}

	namespace clearTimeout {
		const __promisify__: null;
	}

	namespace clearInterval {
		const __promisify__: null;
	}

	interface Window {
		old_local: {};
		g_remote_timer_api: {};
	}
}
