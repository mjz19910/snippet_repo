/* spell:words
--- version_list item 3 ---
v1 (old-o): snippet_repo_v2/javascript/final/items/item3_v1.js
v2 (cur-c): snippet_repo_v2/javascript/snippet/group1/sub_a/item-_3.js
v3 (use-m): snippet_repo_v2/javascript/final/missing/item3_v3.js
v4 (use-m): snippet_repo_v2/javascript/final/missing/item3_v4.js
--- version_list end ---
this snippet requires g_error_stack to be set
*/
function get_location_from_error_stack_lines(error_lines, offset){
	let cur_line=error_lines[offset];
	let res=cur_line.match(/(?:\s+at )(?<res>.+)/);
	if(res.groups.res.at(-1)==='()'[1]){
		return res.groups.res.split(/(.+?)\((.+)\)/)[2];
	}
	return res.groups.res;
}
if(!window.g_error_stack_lines)g_error_stack_lines=g_error_stack.split("\n");
if(!window.src_str_lines){
	let url_str=get_location_from_error_stack_lines(g_error_stack_lines, 3);
	let fetch_src_url=url_str.split(/(.+):(.+?):(.+?)$/)[1];
	console.log('fetching', fetch_src_url);
	window.src_str_response=await fetch.__proxied_target__.call(window, fetch_src_url);
	window.src_str_lines=(await src_str_response.text()).split("\n");
}
function code_after_line_location_from_lines(lines, url_str){
	let [,line, col]=url_str.match(/(?:.+):(.+?):(.+?)$/);
	return lines[parseInt(line)-1].slice(parseInt(col)-1);
}
let source_location;
let bad_loc=get_location_from_error_stack_lines(g_error_stack_lines, 3+4);
source_location=get_location_from_error_stack_lines(g_error_stack_lines, 3+3);
let last_good_loc=code_after_line_location_from_lines(src_str_lines, source_location);
last_good_loc;