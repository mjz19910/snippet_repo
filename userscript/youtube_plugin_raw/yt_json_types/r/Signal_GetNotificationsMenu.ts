type Signal_GetNotificationsMenu={
	signal: "GET_NOTIFICATIONS_MENU";
	actions: TA_OpenPopup<P_NotificationMenu_Popup>[];
};
type AllSignalTypes=
|Signal_GetNotificationsMenu
|G_ClientSignal
;