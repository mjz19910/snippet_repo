import {find_element_tag_name} from "./find_element_tag_name.ts"
import {found_element} from "./found_element.ts"
import {found_element_arr} from "./found_element_arr.ts"

export function try_find_element(message_id: number) {
	if(found_element_arr.includes(find_element_tag_name))
		return
	if(found_element.value)
		return
	if(!find_element_tag_name)
		return
	let element=document.getElementsByTagName(find_element_tag_name)[0]
	if(element) {
		console.log('found element at message_id=%o',message_id)
		debugger
		found_element.value=true
	}
}
