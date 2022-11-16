import {intercept_setTimeoutAPI} from "../api/setTimeout.js";
import {FakeWindow} from "../FakeWindow.js";
import {DomBadge} from "../implementation/DomBadge.js";
import {fake} from "./mod.js";
export function init() {
	fake.window=new FakeWindow(new DomBadge);
	fake.window.setTimeout=intercept_setTimeoutAPI(fake.window.setTimeout);
}
