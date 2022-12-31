import {ResponseContext} from "../g/GeneralContext.js";
import {OpenPopupActionItem} from "../o/OpenPopupActionItem";

export type GetNotificationMenuJson={
	responseContext: ResponseContext;
	actions: OpenPopupActionItem[];
	trackingParams: string;
};
