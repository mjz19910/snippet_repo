type D__TopbarMenuButton={
	icon: T$Icon<"VIDEO_CALL">;
	menuRenderer: T$R$MultiPageMenu<{
		sections: [T$R$MultiPageMenuSection<R$CompactLink>];
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