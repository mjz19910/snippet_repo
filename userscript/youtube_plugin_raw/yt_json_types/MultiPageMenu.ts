type MultiPageMenu={
	header: SimpleMenuHeaderRenderer;
	sections: AccountSectionListRenderer[];
	footer: MultiPageMenuSectionRenderer<A$CompactLinkRenderer>;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER";
}|{
	sections: MultiPageMenuSectionRenderer<A$CompactLinkRenderer>[];
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