declare global {
	class HTMLState {}
	class NodeInternalData {}
	class FakeElement {}
	class DOMBadge {}
	class Badge {}
	function create_fake():void;
	namespace fake {
		var window:typeof Window & typeof globalThis;
	}
}

export {}