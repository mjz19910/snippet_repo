/* spell:words
--- version_list item 3 ---
v1 (old-o): snippet_repo_v2/javascript/final/items/item3_v1.js
v2 (cur-c): snippet_repo_v2/javascript/snippet/group1/sub_a/item-_3.js
--- version_list end ---
this snippet requires g_error_stack to be set
*/
if(!window.src_str_lines){
	window.src_str_response=await fetch.__proxied_target__.call(window, g_error_stack.split("\n").slice(3)[0].split(/(?:\s+)(.+)/, 2)[1].split("at ")[1].split(/(.+?)\((.+)\)/)[2].split(/(.+):(.+?):(.+?)$/)[1]);
	window.src_str_lines=(await src_str_response.text()).split("\n");
}
function code_after_line_location_from_lines(lines, url_str){
	let [,line, col]=url_str.match(/(?:.+):(.+?):(.+?)$/);
	return lines[parseInt(line)-1].slice(parseInt(col)-1);
}
if(!window.g_error_stack_lines)g_error_stack_lines=g_error_stack.split("\n");
function get_location_from_error_stack_lines(error_lines, offset){
	let cur_line=error_lines[offset];
	let res=cur_line.match(/(?:\s+at )(?<res>.+)/);
	if(res.groups.res.at(-1)==='()'[1]){
		return error_lines[offset].split(/(?:\s+)(.+)/, 2)[1].split("at ")[1].split(/(.+?)\((.+)\)/)[2];
	}
	return res.groups.res;
}
let source_location;
let bad_loc=get_location_from_error_stack_lines(g_error_stack_lines, 3+4);
source_location=get_location_from_error_stack_lines(g_error_stack_lines, 3+3);
let last_good_loc=code_after_line_location_from_lines(src_str_lines, source_location);
last_good_loc;