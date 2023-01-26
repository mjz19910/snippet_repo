type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: TE_SignalService<{webCommandMetadata: GM_notification_get_notification_menu;},{
		signal: "GET_NOTIFICATIONS_MENU";
		actions: TA_OpenPopup<{}>[];
	}>;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: TE_SignalService<{},{}>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};