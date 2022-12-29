import {GeneralContext} from "../yt_api/_abc/g/GeneralContext.js";

export type notification_get_notification_menu={
	url_type: "notification.get_notification_menu";
	json: {
		responseContext: GeneralContext;
		actions: {
			clickTrackingParams: string;
			openPopupAction: {
				popup: {
					multiPageMenuRenderer: {
						header: {};
						sections: {}[];
						trackingParams: string;
					};
				};
				popupType: "DROPDOWN";
			}
		}[];
		trackingParams: string;
	};
};
