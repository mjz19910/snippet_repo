type D_TopbarMenuButton={
	icon: T_Icon<"VIDEO_CALL">;
	menuRenderer: TR_MP_Menu<{
		sections: [TR_MP_MenuSection<R_CompactLink>];
		trackingParams: string;
		style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
	}>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: D_Thumbnail;
	menuRequest: TE_SignalService<S_GetAccountMenu>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
};