type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: R_SettingsPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type SettingsEndpoint={};