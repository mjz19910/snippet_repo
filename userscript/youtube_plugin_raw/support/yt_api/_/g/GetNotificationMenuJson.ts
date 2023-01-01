import {ResponseContext} from "./json/GeneralContext.js";
import {OpenPopupActionItem} from "../o/OpenPopupActionItem";

export type GetNotificationMenuJson={
	responseContext: ResponseContext;
	actions: OpenPopupActionItem[];
	trackingParams: string;
};
