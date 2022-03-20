import {DOMBadge, fake, FakeWindow} from "fake-dom";
import {intercept_setTimeoutAPI} from "fake-dom-api";
/**@type {FakeWindow|null} */
export let fake_window = null;
export function init() {
	fake_window=new FakeWindow(new DOMBadge);
	fake.window=fake_window;
	fake_window.setTimeout = intercept_setTimeoutAPI(fake_window.setTimeout);
}
