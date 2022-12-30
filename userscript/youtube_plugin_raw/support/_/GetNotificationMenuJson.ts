import {ResponseContext} from "../yt_api/_/g/GeneralContext.js";
import {OpenPopupActionItem} from "./OpenPopupActionItem";

export type GetNotificationMenuJson={
	responseContext: ResponseContext;
	actions: OpenPopupActionItem[];
	trackingParams: string;
};
