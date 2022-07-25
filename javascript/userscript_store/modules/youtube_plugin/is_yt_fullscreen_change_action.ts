/**@type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}}*/
export function is_yt_fullscreen_change_action(detail: any): detail is {actionName: "yt-fullscreen-change-action"; args: [boolean]} {
	return detail.actionName==='yt-fullscreen-change-action'
}
