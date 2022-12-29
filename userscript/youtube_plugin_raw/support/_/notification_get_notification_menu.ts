import {GeneralContext} from "../yt_api/_/g/GeneralContext.js";
import {OpenPopupAction} from "./OpenPopupAction";
export type notification_get_notification_menu={
	url_type: "notification.get_notification_menu";
	json: {
		responseContext: GeneralContext;
		actions: {
			clickTrackingParams: string;
			openPopupAction: OpenPopupAction<"Notifications">;
		}[];
		trackingParams: string;
	};
};
