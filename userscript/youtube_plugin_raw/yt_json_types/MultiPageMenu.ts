type MultiPageMenu={
	header: SimpleMenuHeaderRenderer;
	sections: AccountSectionListRenderer[];
	footer: MultiPageMenuSectionRenderer<CompactLinkRenderer>;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER";
}|{
	sections: MultiPageMenuSectionRenderer<CompactLinkRenderer>[];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
}|{
	header: SimpleMenuHeaderRenderer;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
};
type ItemsTemplate<T>={
	items: T[];
	trackingParams: string;
};