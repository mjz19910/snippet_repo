type NotificationMenuPopupMenuItem={
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
	showLoadingSpinner: true;
};

type NotificationMenu_Popup={
	popup: TR_MP_Menu<NotificationMenuPopupMenuItem>;
	popupType: "DROPDOWN";
	beReused: true;
};
type UU=T_Split<Lowercase<"GET_NOTIFICATIONS_MENU">,"_"> extends (infer T extends any[])?
Join<{[U in keyof T]:Capitalize<T[U]>},"">:never;


type Signal_GetNotificationsMenu={
	signal: "GET_NOTIFICATIONS_MENU";
	actions: TA_OpenPopup<NotificationMenu_Popup>[];
};

type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: TE_SignalService<
		M_GetNotificationMenu,
		Signal_GetNotificationsMenu>;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: TE_SignalService<{},{}>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};