import {HTMLToken} from "./HTMLToken.js";

/**
 * @param {import("./HTMLTokenizer.jstxt").HTMLTokenizer} state
 * @arg {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']], number>} type
 */
export function create_new_token(state,type) {
	state.m_current_token=new HTMLToken(type,0);
	let offset=0;
	switch(type) {
		case HTMLToken.Type.StartTag:
			offset=1;
			break;
		case HTMLToken.Type.EndTag:
			offset=2;
			break;
		default:
			break;
	}

	state.m_current_token.set_start_position("Badge_HTMLTokenizer",state.nth_last_position(offset));
}
