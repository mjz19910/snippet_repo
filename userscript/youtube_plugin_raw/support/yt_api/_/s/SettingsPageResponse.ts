import {Icon} from "../i/Icon.js";
import {YtEndpoint} from "../YtEndpoint.js";
import {SettingsEndpointPages} from "./SettingsEndpointPages";
import {SettingsResponseContent} from "./SettingsResponseContent";

export type SettingsPageResponse={
	page: "settings";
	endpoint: YtEndpoint;
	response: SettingsResponseContent;
	url: `/${SettingsEndpointPages}`;
};
export type SettingsIconTypes=Icon<"ACCOUNT_PRIVACY"|"ACCOUNT_SHARING"|"ACCOUNT_ADVANCED"|"ACCOUNT_BILLING"|"ACCOUNT_SETTINGS"|"ACCOUNT_NOTIFICATIONS">;