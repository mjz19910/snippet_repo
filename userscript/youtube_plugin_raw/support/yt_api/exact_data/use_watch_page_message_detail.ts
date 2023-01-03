async function use_watch_page_message_detail() {
	const watch_j_response=(await import("./json/page_type_watch_detail.json")).default;
	const json: typeof watch_j_response=watch_j_response;
	type Json=typeof json;
	type JResponse=Json["response"];
	type json_d=keyof Json;
	type json_d_2=keyof JResponse;
	type JR_x={a: {[U in json_d_2]: JResponse[U]};};
	class VV implements JR_x {
		a=json.response;
	}
	VV;
	const endpoint=json.response.endpoint;
	console.log("page ep",endpoint);
	type XX={
		a: {
			[U in json_d]: Json[U];
		};
	};
	return [
		class implements XX {a=json;},
	] as {}[];
}
