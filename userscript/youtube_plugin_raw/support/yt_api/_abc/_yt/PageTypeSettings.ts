import {SettingsResponse} from "./SettingsResponse";

export type PageTypeSettings={
	pageType: "settings";
	endpoint: {};
	response: SettingsResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
