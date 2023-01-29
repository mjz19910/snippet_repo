type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: EX_GetNotificationMenuRequest;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: UE_UnseenNotificationCount;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};
type GM_GetUnseenNotificationCount={sendPost: true;apiUrl: "/youtubei/v1/notification/get_unseen_count";};
type M_GetUnseenNotificationCount={webCommandMetadata: GM_GetUnseenNotificationCount;};
type UE_UnseenNotificationCount=T_SE_Signal<M_GetUnseenNotificationCount,T_Signal<"GET_UNSEEN_NOTIFICATION_COUNT">>;