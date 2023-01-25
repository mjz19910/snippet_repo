type DE_GetNotificationMenu={
	ctoken: string;
};

type E_GetNotificationMenu={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
			apiUrl: "/youtubei/v1/notification/get_notification_menu";
		};
	};
	getNotificationMenuEndpoint: DE_GetNotificationMenu;
};