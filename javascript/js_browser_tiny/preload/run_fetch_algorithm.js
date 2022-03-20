import {FetchRequestState} from "./FetchRequestState.js";
/**@param {FetchRequestState} state */
export function run_fetch_algorithm(state) {
	if(!state.url)
		throw new Error("Invalid state");
	if(!state.m_start_request_module)
		throw new Error("No Handler for the fetch request");
	state.m_client_request = state.m_start_request_module.get(
		state.url,
		incoming_message => state.on_incoming_message(incoming_message)
	)
		.on('error', error => state.on_error_result(error))
		.end();
}
