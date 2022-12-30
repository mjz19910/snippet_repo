import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {SettingsResponseContent} from "./SettingsResponseContent";

export type SettingsPageResponse={
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponseContent;
	url: string;
};
