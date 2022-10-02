import {intercept_setTimeoutAPI} from "../api/setTimeout.js"
import {FakeWindow} from "../FakeWindow.js"
import {DOMBadge} from "../mod.js"
import {fake} from "./mod.js"
export function init() {
	fake.window=new FakeWindow(new DOMBadge)
	fake.window.setTimeout=intercept_setTimeoutAPI(fake.window.setTimeout)
}
