type YtNotification={
	thumbnail: Thumbnail;
	videoThumbnail: Thumbnail;
	shortMessage: SimpleText;
	sentTimeText: SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractionsEndpoint;
	contextualMenu: MenuRenderer;
	trackingParams: string;
	notificationId: `${number}`;
};
