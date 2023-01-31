type D_TopbarMenuButton_MenuItem={
	sections: [TR_MP_MenuSection<R_CompactLink>];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
};
type R_TopbarMenu=TR_MultiPageMenu<D_TopbarMenuButton_MenuItem>;

type D_TopbarMenuButton={
	icon: T_Icon<"VIDEO_CALL">;
	menuRenderer: R_TopbarMenu;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: R_Thumbnail;
	menuRequest: T_SE_Signal<M_AccountMenu,S_GetAccountMenu>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
};