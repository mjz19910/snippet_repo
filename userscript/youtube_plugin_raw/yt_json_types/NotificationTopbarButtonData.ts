type NotificationTopbarButtonData={
	icon: T$Icon<"NOTIFICATIONS">;
	menuRequest: E$T$SignalService;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: E$T$SignalService;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};