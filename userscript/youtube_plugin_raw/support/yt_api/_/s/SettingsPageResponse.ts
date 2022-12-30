import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {SettingsEndpointPages} from "./SettingsEndpointPages";
import {SettingsResponseContent} from "./SettingsResponseContent";

export type SettingsPageResponse={
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponseContent;
	url: `/${SettingsEndpointPages}`;
};
