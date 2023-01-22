type D_TopbarMenuButton={
	icon: T_Icon<"VIDEO_CALL">;
	menuRenderer: T$R_MultiPageMenu<{
		sections: [T$R_MultiPageMenuSection<R_CompactLink>];
		trackingParams: string;
		style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
	}>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: D_Thumbnail;
	menuRequest: E_T$SignalService<Signal$GetAccountMenu>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
};