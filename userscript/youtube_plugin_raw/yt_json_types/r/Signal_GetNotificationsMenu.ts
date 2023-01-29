type Signal_GetNotificationsMenu={
	signal: "GET_NOTIFICATIONS_MENU";
	actions: TA_OpenPopup<P_NotificationMenu_Popup>[];
};
type G_AllSignalTypes=
|Signal_GetNotificationsMenu
|G_ClientSignal
|G_AllSignalServiceEndpoint['signalServiceEndpoint']
;
type G_AllSignalServiceEndpoint=UpdateUnseenNotificationCountEndpoint;