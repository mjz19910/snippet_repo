/**
 * @param {boolean} include_uninteresting
 */
export function getPlaybackRateMap(include_uninteresting) {
	let progress_map=new Map;
	if(include_uninteresting) {
		let elem_list=document.querySelectorAll("ytd-compact-video-renderer:has(#overlays:not(* > #progress))");
		elem_list.length>0&&progress_map.set("none",[...elem_list]);
	}
	let sel=(/**@type {string}*/ e) => `ytd-compact-video-renderer:has(#progress[style="width: ${e}%;"])`;
	for(let i=0;i<=100;i++) {
		if(!include_uninteresting&&i===100)
			continue;
		let elem=document.querySelectorAll(sel(i.toString()));
		if(elem.length==1) {
			progress_map.set("some:"+i,[...elem]);
		} else if(elem.length>0) {
			progress_map.set("some:"+i,[...elem]);
		}
	}
	return progress_map;
}
