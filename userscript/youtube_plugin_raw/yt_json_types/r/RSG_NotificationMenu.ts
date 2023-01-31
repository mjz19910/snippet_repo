type RSG_NotificationMenu_Action=TA_OpenPopup<D_NotificationMenu_Popup>;

type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: RSG_NotificationMenu_Action[];
	trackingParams: string;
};