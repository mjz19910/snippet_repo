import {FakeHTMLElement} from "./FakeHTMLElement.js";

const prop_hide = new WeakMap;
export class HTMLImageElement extends FakeHTMLElement {
	set src(src) {
		var me;
		if(!prop_hide.has(this)) {
			prop_hide.set(this, {});
		}
		me = prop_hide.get(this);
		console.log('image.src', src);
		me.src = src;
	}
	get src() {
		if(!prop_hide.has(this))
			return;
		prop_hide.get(this).src;
	}

}
