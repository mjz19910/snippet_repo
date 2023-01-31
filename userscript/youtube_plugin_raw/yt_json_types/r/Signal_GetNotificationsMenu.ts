type P_NotificationMenu_Popup=TR_MultiPageMenu<D_NotificationMenuPopupMenuItem>;

type G_Action_GetNotificationsMenu_Popup={
	popup: P_NotificationMenu_Popup;
	popupType: "DROPDOWN";
	beReused: true;
};

type G_Action_GetNotificationsMenu=TA_OpenPopup<G_Action_GetNotificationsMenu_Popup>;

type Signal_GetNotificationsMenu={
	signal: "GET_NOTIFICATIONS_MENU";
	actions: G_Action_GetNotificationsMenu[];
};
type G_AllSignalTypes=
|Signal_GetNotificationsMenu
|G_ClientSignal
|G_AllSignalServiceEndpoint['signalServiceEndpoint']
;
type G_AllSignalServiceEndpoint=D_NotificationTopbarButton['updateUnseenCountEndpoint'];
