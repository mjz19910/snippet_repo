type D__TopbarMenuButton={
	icon: T$Icon<"VIDEO_CALL">;
	menuRenderer: T$R_MultiPageMenu<{
		sections: [T$R_MultiPageMenuSection<R_CompactLink>];
		trackingParams: string;
		style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
	}>;
	trackingParams: string;
	accessibility: D__Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: D__Thumbnail;
	menuRequest: E$T$SignalService<Signal$GetAccountMenu>;
	trackingParams: string;
	accessibility: D__Accessibility;
	tooltip: string;
};