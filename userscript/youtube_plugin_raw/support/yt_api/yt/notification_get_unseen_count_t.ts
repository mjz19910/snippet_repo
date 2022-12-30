import {GeneralContext} from "../_/g/GeneralContext.js";

export type notification_get_unseen_count_t={
	url_type: "notification.get_unseen_count";
	json: {
		responseContext: GeneralContext;
		unseenCount: number;
	};
};
