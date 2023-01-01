import {OpenPopupActionItem} from "../support/yt_api/_/o/OpenPopupActionItem.js";
import {AddToPlaylistCommandH} from "../support/yt_api/_/a/AddToPlaylistCommandH.js";
import {YtSignalAction} from "./YtSignalAction";

export type ServiceEndpointAction=AddToPlaylistCommandH|OpenPopupActionItem|{
	clickTrackingParams: string;
	signalAction: YtSignalAction;
};
