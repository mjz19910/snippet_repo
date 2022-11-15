export function resolve_function_constructor() {
	if(globalThis.Node===void 0) {
		// we are in Node, there is no DOM
		return Function;
	}
	let iframe_element=document.createElement("iframe");
	document.head.append(iframe_element);

	if(!iframe_element.contentWindow)
		throw new Error("No content window");

	let content_window_r=iframe_element.contentWindow;
	let content_window=content_window_r.self;

	return content_window.Function;
}
