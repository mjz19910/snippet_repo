import {intercept_setTimeoutAPI} from "../api/setTimeout.js";
import {FakeWindow} from "../FakeWindow.js";
import {DomBadge} from "../implementation/DomBadge.js";

export function do_create_window() {
	let win=new FakeWindow(new DomBadge);
	win.setTimeout=intercept_setTimeoutAPI(win.setTimeout);
	return win;
}
