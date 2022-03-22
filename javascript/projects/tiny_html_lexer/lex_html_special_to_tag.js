import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
/**
 * @param {(ReturnType<typeof js_type_html_lex_arr> | HTMLTagLex)[]} arr
 */
function req_pop(arr){
	let value=arr.pop();
	if(!value)
		throw new Error("Element underflow");
	return value;
}
// cant use fn for this one
/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex | HTMLTagLex)[]} elements
 * @param {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex)[]} arr
 * @arg {number} idx
 */
export function lex_html_special_to_tag(elements, arr, idx) {
	/**@type {(ReturnType<typeof js_type_html_lex_arr>|HTMLTagLex)[]} */
	let tag_acc=[];
	let cur=arr[idx];
	switch(cur.value) {
		case '>':
			let tag_content = req_pop(elements);
			if(tag_content.type === 'special') {
				tag_acc.push(req_pop(elements));
				tag_acc.unshift(req_pop(elements));
				tag_content.value += cur.value;
				tag_acc.push(tag_content);
				// console.log(`item.value === '>' && pop(elements).type === 'special'`, tag_acc);
				if(tag_acc[0].type === 'special' && tag_acc[2].type === 'special' && tag_acc[1].type === 'data'){
					elements.push(new HTMLTagLex(tag_acc[0].value, tag_acc[2].value, tag_acc[1]));
				} else {
					throw new Error("TODO");
				}
			} else if(tag_content.type === 'data') {
				tag_acc.push(req_pop(elements));
				tag_acc.push(tag_content);
				tag_acc.push(cur);
				// console.log(`item.value === '>' && pop(elements).type === 'data'`, tag_acc);
				if(tag_acc[0].type === 'special' && tag_acc[1].type === 'data' && tag_acc[2].type === 'special') {
					elements.push(new HTMLTagLex(tag_acc[0].value, tag_acc[2].value, tag_acc[1]));
				} else if(tag_acc[0].type === 'tag' && tag_acc[1].type === 'data' && tag_acc[2].type === 'special') {
					tag_acc[1].value += tag_acc[2].value;
					elements.push(tag_acc[0], tag_acc[1]);
					console.log('script tag drop', tag_acc[2].value);
				}
				else {
					console.log('hist ---------- \n%o', elements.slice(-4));
					console.log('acc ---------- \n%o', tag_acc);
					console.log('nx ---------- \n%o', arr[idx+1]);
					throw new Error("TODO");
				}
			} else if(tag_content.type === 'tag') {
				tag_acc.push(tag_content);
				tag_acc.push(cur);
				for(let i=0;i<tag_acc.length;i++){
					elements.push(tag_acc[i]);
				}
				// console.log(`item.value === '>' && pop(elements).type === 'tag'`, tag_acc);
			} else {
				console.debug("Not handled for", tag_content);
				throw new Error("Tag type not handled");
			}
			break;
		case '/':
		case '<':
		case '\n':
		case '<!':
		case '</': elements.push(cur); break;
		default:{
			console.log('nx ---------- \n%o', arr[idx+1]);
			console.log('need parse ----- \n%o', cur);
			throw new Error("Parse: \""+cur.value+"\"");
		}
	}
}
