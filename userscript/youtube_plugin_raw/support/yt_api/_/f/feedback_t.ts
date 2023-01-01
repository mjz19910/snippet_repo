import {ResponseContext} from "../g/GeneralContext.js";

export type feedback_t={
	type: "feedback";
	data: {
		responseContext: ResponseContext;
	};
};
