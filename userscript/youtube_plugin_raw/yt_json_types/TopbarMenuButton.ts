type TopbarMenuButton={
	icon: T$Icon<"VIDEO_CALL">;
	menuRenderer: T$R$MultiPageMenu<{
		sections: [T$R$MultiPageMenuSection<R$CompactLink>];
		trackingParams: string;
		style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
	}>;
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: D$Thumbnail;
	menuRequest: E$SignalServiceEndpoint<Signal$GetAccountMenu>;
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
};
