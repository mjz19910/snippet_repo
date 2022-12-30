import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {SettingsResponseContent} from "./SettingsResponseContent";
type account_sub_parts="notifications"|"privacy"|"advanced";
export type SettingsPageResponse={
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponseContent;
	url: `/account${""|`_${account_sub_parts}`}`;
};
