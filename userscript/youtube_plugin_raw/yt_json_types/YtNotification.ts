type YtNotification={
	thumbnail: Thumbnail;
	videoThumbnail: Thumbnail;
	shortMessage: D$SimpleText;
	sentTimeText: D$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractionsEndpoint;
	contextualMenu: MenuRenderer;
	trackingParams: string;
	notificationId: `${number}`;
};
