type R$GetNotificationMenu={
	responseContext: RC$ResponseContext;
	actions: T$A_OpenPopup<{
		popup: T$R$MultiPageMenu<{
			header: R$SimpleMenuHeader;
			sections: R$MP$MenuNotificationSection[];
			style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
			trackingParams: string;
		}>;
		popupType: "DROPDOWN";
	}>[];
	trackingParams: string;
};