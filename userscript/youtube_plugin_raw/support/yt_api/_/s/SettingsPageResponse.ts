import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {Icon} from "../i/Icon.js";
import {SettingsEndpointPages} from "./SettingsEndpointPages";
import {SettingsResponseContent} from "./SettingsResponseContent";

export type SettingsPageResponse={
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponseContent;
	url: `/${SettingsEndpointPages}`;
};
export type SettingsIconTypes=Icon<"ACCOUNT_PRIVACY"|"ACCOUNT_SHARING"|"ACCOUNT_ADVANCED"|"ACCOUNT_BILLING"|"ACCOUNT_SETTINGS"|"ACCOUNT_NOTIFICATIONS">;