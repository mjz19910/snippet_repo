type G_RS_AllResponses={};
class YtHandlers {
	on_handle_api(request: string|URL|Request,response: Response,response_obj: G_RS_AllResponses) {
		request; response; response_obj;
		throw new Error("Not Implemented");
	}
}
var yt_handlers=new YtHandlers;

export function fetch_filter_text_then_data_url(request: string|URL|Request,response: Response,response_obj: G_RS_AllResponses) {
	try {yt_handlers.on_handle_api(request,response,response_obj);} catch(e) {
		console.log("plugin error");
		console.log(e);
	}
}
