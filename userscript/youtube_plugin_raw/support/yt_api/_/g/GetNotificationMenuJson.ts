import {ResponseContext} from "./json/GeneralContext.js";
import {OpenPopupActionItem} from "../../../../yt_json_types/OpenPopupActionItem";

export type GetNotificationMenuJson={
	responseContext: ResponseContext;
	actions: OpenPopupActionItem[];
	trackingParams: string;
};
