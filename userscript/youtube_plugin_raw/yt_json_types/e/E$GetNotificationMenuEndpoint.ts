type DE_GetNotificationMenu={
	ctoken: string;
};

type E_GetNotificationMenu={
	clickTrackingParams: string;
	commandMetadata: {webCommandMetadata: GM_GetNotificationMenu;};
	getNotificationMenuEndpoint: DE_GetNotificationMenu;
};