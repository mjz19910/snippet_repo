export function sumOffset(element: HTMLElement) {
	let cache={
		top_offset: 0,
		left_offset: 0
	};
	let cur_element: HTMLElement|null=null;
	cur_element=element;
	for(;;) {
		cache.top_offset+=cur_element.offsetTop;
		cache.left_offset+=cur_element.offsetLeft;
		let next_element: Element|null=cur_element.offsetParent;
		if(next_element instanceof HTMLElement) {
			cur_element=next_element;
		} else {
			break;
		}
	}
	return cache;
}
