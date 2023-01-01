import {YtEndpoint} from "../../json/YtEndpoint.js";
import {YtTextType} from "../../json/YtTextType.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";

export type SettingsSwitchRendererData={
	title: YtTextType;
	subtitle: YtTextType;
	enabled: boolean;
	enableServiceEndpoint: YtEndpoint;
	disableServiceEndpoint: YtEndpoint;
	id: "SETTINGS_OPTIONS_ID_TYPE_PUSH_NOTIFICATIONS_ENABLED";
	text: YtTextType;
	thumbnail?: ThumbnailsList;
	trackingParams: string;
};
