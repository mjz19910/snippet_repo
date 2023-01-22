type D__NotificationTopbarButton={
	icon: T$Icon<"NOTIFICATIONS">;
	menuRequest: E_T$SignalService<{}>;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D__Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: E_T$SignalService<{}>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};