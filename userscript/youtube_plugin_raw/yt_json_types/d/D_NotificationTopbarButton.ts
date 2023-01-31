type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: ER_GetNotificationMenuRequest;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: T_SE_Signal<M_GetUnseenNotificationCount,T_Signal<"GET_UNSEEN_NOTIFICATION_COUNT">>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};