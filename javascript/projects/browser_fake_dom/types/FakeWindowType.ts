import {FakeEventTarget} from "../EventTarget.js"
import {FakeWindow} from "../FakeWindow.js"
export class FakeWindowType extends FakeEventTarget {
	[k: number]: FakeWindow
}
