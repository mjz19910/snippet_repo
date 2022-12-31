import {Accessibility} from "../a/Accessibility.js";
import {Icon} from "../i/Icon.js";
import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {CommandMetadata} from "./CommandMetadata.js";

type YtEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	signalServiceEndpoint: SignalServiceEndpointData;
}

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
