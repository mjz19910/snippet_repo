import {SettingsPageResponse} from "../s/SettingsPageResponse";
import {YtEndpoint} from "../../yt/YtEndpoint.js";

export type PageTypeSettings={
	pageType: "settings";
	endpoint: YtEndpoint;
	response: SettingsPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
