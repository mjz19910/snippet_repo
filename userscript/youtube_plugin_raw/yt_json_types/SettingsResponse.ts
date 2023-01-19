type SettingsPageResponse={
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponse;
	url: string;
	expirationTime?: number;
	previousCsn?: string;
}|{
	page: "settings";
	endpoint: BrowseEndpoint;
	response: SettingsResponse;
	url: string;
	rootVe: 23462;
	expirationTime?: number;
	previousCsn?: string;
};