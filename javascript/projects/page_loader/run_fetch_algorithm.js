import {fake} from "../browser_fake_dom/mod.js";
import {FetchRequestState} from "./FetchRequestState.js";
/**@param {FetchRequestState} state */
export async function run_fetch_algorithm(state) {
	if(!fake.document)
		throw new Error("Missing document");
	await new Promise(function(accept, reject){
		if(!state.url)
			throw new Error("Invalid state");
		if(!state.m_start_request_module)
			throw new Error("No Handler for the fetch request");
		if(!state.on_incoming_message)
			throw new Error("No Handler for server response");
		state.m_client_request = state.m_start_request_module.get(
		state.url,
		(incoming_message) => {
			let res=state.on_incoming_message(incoming_message);
			res.then(accept, reject);
		}
	)
		.on('error', error => state.on_error_result(error))
		.end();
	});
}
