export class WindowBoxImpl {
	type: "object_box"="object_box";
	value: Window
	extension=null;
	inner_type: "Window"="Window";
	as_type(type: 'function') {
		if(typeof this.value===type)
			return this
		return null
	}
	constructor(value: Window) {
		this.value=value
	}
}
