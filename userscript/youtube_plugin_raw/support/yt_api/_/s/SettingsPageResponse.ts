import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {SettingsEndpointPages} from "./SettingsEndpointPages";
import {SettingsResponseContent} from "./SettingsResponseContent";

export type SettingsPageResponse={
	page: "settings";
	endpoint: YtEndpoint;
	response: SettingsResponseContent;
	url: `/${SettingsEndpointPages}`;
};
