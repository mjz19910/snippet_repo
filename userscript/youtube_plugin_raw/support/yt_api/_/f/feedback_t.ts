import {ResponseContext} from "../g/GeneralContext.js";

export type feedback_t={
	url_type: "feedback";
	json: {
		responseContext: ResponseContext;
	};
};
