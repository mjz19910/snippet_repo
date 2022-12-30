import {SettingsPageResponse} from "../s/SettingsPageResponse";
import {SettingsEndpoint} from "./SettingsEndpoint";

export type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: SettingsPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
