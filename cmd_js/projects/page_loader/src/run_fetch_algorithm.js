import {PageLoaderState} from "./PageLoaderState.js";

/** @arg {PageLoaderState} state @returns {Promise<void>} */
export function run_fetch_algorithm(state) {
	return new Promise(function(accept,reject) {
		if(!state.url) throw new Error("Invalid state");
		state.m_client_request=state.m_start_request_module.get(
			state.url,
			(incoming_message) => {
				let res=state.on_incoming_message(incoming_message);
				res.then(accept,reject);
			}
		)
			.on('error',error => state.on_error_result(error))
			.end();
	});
}
