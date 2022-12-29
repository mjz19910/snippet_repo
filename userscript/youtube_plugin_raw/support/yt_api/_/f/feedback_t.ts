import {GeneralContext} from "../GeneralContext.js";

export type feedback_t={
	url_type: "feedback";
	json: {
		responseContext: GeneralContext;
	};
};
