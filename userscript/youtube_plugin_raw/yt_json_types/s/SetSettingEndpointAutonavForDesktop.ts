type E_SetSettingAutonavForDesktop<T extends boolean>={
	clickTrackingParams: string;
	commandMetadata: {webCommandMetadata: GM_account_set_setting;};
	setSettingEndpoint: SettingItemAutonavForDesktop<T>;
};