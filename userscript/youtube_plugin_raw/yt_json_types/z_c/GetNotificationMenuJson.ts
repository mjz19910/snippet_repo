type R_GetNotificationMenu={
	responseContext: RC$ResponseContext;
	actions: TA_OpenPopup<{
		popup: TR_MP_Menu<{
			header: R_SimpleMenuHeader;
			sections: R_MP_MenuNotificationSection[];
			style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
			trackingParams: string;
		}>;
		popupType: "DROPDOWN";
	}>[];
	trackingParams: string;
};