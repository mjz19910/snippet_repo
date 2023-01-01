import {ResponseContext} from "./GeneralContext.js";

export type get_transcript_t={
	type: "get_transcript";
	data: {
		responseContext: ResponseContext;
	};
};
