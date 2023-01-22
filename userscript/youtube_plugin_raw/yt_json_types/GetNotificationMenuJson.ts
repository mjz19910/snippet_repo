type R_GetNotificationMenu={
	responseContext: RC$ResponseContext;
	actions: T$A_OpenPopup<{
		popup: T$R_MultiPageMenu<{
			header: R_SimpleMenuHeader;
			sections: R_MP$MenuNotificationSection[];
			style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
			trackingParams: string;
		}>;
		popupType: "DROPDOWN";
	}>[];
	trackingParams: string;
};