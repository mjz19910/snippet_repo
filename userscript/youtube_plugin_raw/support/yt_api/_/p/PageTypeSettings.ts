import {YtEndpoint} from "../b/YtEndpoint.js";
import {SettingsPageResponse} from "../s/SettingsPageResponse";

export type PageTypeSettings={
	pageType: "settings";
	endpoint: YtEndpoint;
	response: SettingsPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
