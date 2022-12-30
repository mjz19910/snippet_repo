import {SettingsResponse} from "../s/SettingsResponse";
import {SettingsEndpoint} from "./SettingsEndpoint";

export type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: SettingsResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
