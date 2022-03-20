import {FakeDocument} from "../FakeDocument";
import {FakeWindow} from "../FakeWindow";
declare global {
	class HTMLState {}
	class NodeInternalData {}
	class FakeElement {}
	class DOMBadge {}
	class Badge {}
	var create_fake:{
		window():void;
		document():void;
	}
	namespace fake {
		var window:FakeWindow;
		var document:FakeDocument;
	}
}
export {}