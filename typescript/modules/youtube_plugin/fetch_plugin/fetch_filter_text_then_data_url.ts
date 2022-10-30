import {debug} from "../config/debug"
import {yt_handlers} from "../fetch_result_handler_plugin/yt_handlers"

export function fetch_filter_text_then_data_url(url: string|URL,response_obj: {}) {
	let url_obj=new URL(url)
	if(debug.value) console.log('url & response_obj',url,response_obj)
	try {
		yt_handlers.on_handle_api(response_obj,url_obj)
	} catch(err) {
		console.log('filter error')
		console.log(err)
	}
}
