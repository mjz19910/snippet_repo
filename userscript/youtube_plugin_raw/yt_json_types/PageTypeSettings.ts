type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: R$SettingsPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type SettingsEndpoint={};