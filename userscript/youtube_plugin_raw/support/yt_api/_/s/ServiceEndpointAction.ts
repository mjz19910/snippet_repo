import {OpenPopupActionItem} from "../o/OpenPopupActionItem.js";
import {AddToPlaylistCommandH} from "../../_/a/AddToPlaylistCommandH.js";
import {YtSignalAction} from "./YtSignalAction";

export type ServiceEndpointAction=AddToPlaylistCommandH|OpenPopupActionItem|{
	clickTrackingParams: string;
	signalAction: YtSignalAction;
};
