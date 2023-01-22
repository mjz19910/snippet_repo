type MultiPageMenu={
	header: SimpleMenuHeaderRenderer;
	sections: AccountSectionListRenderer[];
	footer: T$R$MultiPageMenuSection<R$CompactLink>;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER";
}|{
	sections: T$R$MultiPageMenuSection<R$CompactLink>[];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
}|{
	header: SimpleMenuHeaderRenderer;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
}|{
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT";
	showLoadingSpinner: true;
};
type ItemsTemplate<T>={
	items: T[];
	trackingParams: string;
};