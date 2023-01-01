import {YtEndpoint} from "../../json/YtEndpoint.js";
import {Accessibility} from "../../../../yt_json_types/Accessibility.js";
import {Icon} from "../i/Icon.js";

export type NotificationTopbarButtonRendererData={
	icon: Icon<"NOTIFICATIONS">;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	menuRequest: YtEndpoint;
	trackingParams:string;
	accessibility:Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: YtEndpoint;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};
