import {ResponseContext} from "./GeneralContext.js";

export type get_transcript_t={
	url_type: "get_transcript";
	json: {
		responseContext: ResponseContext;
	};
};
