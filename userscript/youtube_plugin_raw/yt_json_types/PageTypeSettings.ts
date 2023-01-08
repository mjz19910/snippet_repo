type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: SettingsPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type SettingsEndpoint={};