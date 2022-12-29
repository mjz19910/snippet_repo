import {GeneralContext} from "../_/g/GeneralContext.js";

export type yt_notification_get_unseen_count={
	url_type: "notification.get_unseen_count";
	json: {
		responseContext: GeneralContext;
		unseenCount: number;
	};
};
