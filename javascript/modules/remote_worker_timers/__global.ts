declare global {
	namespace setTimeout {
		const __promisify__: null;
	}

	namespace setInterval {
		const __promisify__: null;
	}
}
