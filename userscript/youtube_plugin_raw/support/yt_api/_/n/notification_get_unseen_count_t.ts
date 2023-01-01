import {ResponseContext} from "../_/g/GeneralContext.js";

export type notification_get_unseen_count_t={
	type: "notification.get_unseen_count";
	data: {
		responseContext: ResponseContext;
		unseenCount: number;
	};
};
