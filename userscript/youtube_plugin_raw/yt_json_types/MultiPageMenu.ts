type MultiPageMenu={
	header: SimpleMenuHeaderRenderer;
	sections: AccountSectionListRenderer[];
	footer: MultiPageMenuSectionRenderer;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER";
}|{
	sections: MultiPageMenuSectionRenderer[];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
};