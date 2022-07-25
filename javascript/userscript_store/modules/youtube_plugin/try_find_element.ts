import {found_element_arr,find_element_tag_name,found_element} from "./youtube_plugin.user"

/**@arg {number} message_id*/
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
