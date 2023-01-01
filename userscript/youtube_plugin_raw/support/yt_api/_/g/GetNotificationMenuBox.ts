import {GetNotificationMenuJson} from "./GetNotificationMenuJson";

export type GetNotificationMenuBox={
	type: "notification.get_notification_menu";
	data: GetNotificationMenuJson;
};
