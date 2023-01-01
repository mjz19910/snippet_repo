async function use_watch_page_message_detail() {
	const watch_j_response=(await import("./json/page_type_watch_detail.json")).default;
	const json: typeof watch_j_response=watch_j_response;
	type Json=typeof json;
	type JResponse=Json["response"];
	function use_page_load_response(response: JResponse) {
		type JResponseContent=Json["response"]["response"];
		async function use_ui_load_response(response: JResponseContent) {
			const mod=await import("./use_response_context.js");
			mod.default.use_response_context(response.responseContext);
			response.responseContext;
		}
		type json_d_2=keyof JResponse;
		type JR_x={a: {[U in json_d_2]: JResponse[U]};};
		class VV implements JR_x {
			a=response;
		}
		VV;
		const endpoint=response.endpoint;
		console.log("page ep",endpoint);
		use_ui_load_response(response.response);
	}
	type json_d=keyof Json;
	use_page_load_response(json.response);
	type XX={
		a: {
			[U in json_d]: Json[U];
		};
	};
	return [
		class implements XX {a=json;},
	] as {}[];
}
