import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {HTMLTagLex} from "./box/HTMLTagLex.js";
/**
 * @param {(HTMLDataLex | HTMLSpecialLex | HTMLTagLex)[]} arr
 */
function req_pop(arr){
	let value=arr.pop();
	if(!value)
		throw new Error("Element underflow");
	return value;
}
/**
 * @param {(HTMLDataLex|HTMLSpecialLex|HTMLTagLex)[]} elements
 * @param {HTMLSpecialLex} item
 */
export function lex_html_special_to_tag(elements, item) {
	/**@type {(HTMLDataLex|HTMLSpecialLex|HTMLTagLex)[]} */
	let tag_acc=[];
	switch(item.value) {
		case '>':
			let tag_content = req_pop(elements);
			if(tag_content.type === 'special') {
				tag_acc.push(req_pop(elements));
				tag_acc.unshift(req_pop(elements));
				tag_content.value += item.value;
				tag_acc.push(tag_content);
				if(tag_acc[0].type === 'special' && tag_acc[2].type === 'special' && tag_acc[1].type === 'data'){
					elements.push(new HTMLTagLex(tag_acc[0].value, tag_acc[2].value, tag_acc[1]));
				} else {
					throw new Error("TODO");
				}
			} else if(tag_content.type === 'data') {
				tag_acc.push(req_pop(elements));
				tag_acc.push(tag_content);
				tag_acc.push(item);
				if(tag_acc[0].type === 'special' && tag_acc[2].type === 'special' && tag_acc[1].type === 'data'){
					elements.push(new HTMLTagLex(tag_acc[0].value, tag_acc[2].value, tag_acc[1]));
				} else {
					console.log(elements.slice(-12), tag_acc);
					throw new Error("TODO");
				}
			} else if(tag_content.type === 'tag') {
				elements.push(tag_content);
				elements.push(item);
			} else {
				console.debug("Not handled for", tag_content);
				throw new Error("Tag type not handled");
			}
			break;
		case '/':
		case '<':
		case '\n':
		case '</': elements.push(item); break;
		default: console.log('need parse', item);
	}
}
