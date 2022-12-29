import {GeneralContext} from "./GeneralContext.js";

export type get_transcript_t={
	url_type: "get_transcript";
	json: {
		responseContext: GeneralContext;
	};
};
