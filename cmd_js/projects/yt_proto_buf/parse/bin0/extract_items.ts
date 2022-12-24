import {DesType} from './DesType.js';

export function extract_items(description: DesType) {
	let items=[];
	let map=new Map(description.valueMap.map(e => [e.key,e.value]));
	for(let x of description.keys) {
		let index=map.get(x);
		if(!index) {
			console.log("missing index");
			continue;
		}
		let item=description.items[index];
		items.push(item);
	}
	return items;
}
