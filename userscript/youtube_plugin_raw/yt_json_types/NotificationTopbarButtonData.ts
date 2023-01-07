type NotificationTopbarButtonData={
	icon: Icon<"NOTIFICATIONS">;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	menuRequest: YtEndpoint;
	trackingParams: string;
	accessibility: Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: YtEndpoint;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};