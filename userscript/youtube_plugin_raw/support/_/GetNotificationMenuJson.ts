import {GeneralContext} from "../yt_api/_/g/GeneralContext.js";
import {OpenPopupActionItem} from "./OpenPopupActionItem";

export type GetNotificationMenuJson={
	responseContext: GeneralContext;
	actions: OpenPopupActionItem[];
	trackingParams: string;
};
