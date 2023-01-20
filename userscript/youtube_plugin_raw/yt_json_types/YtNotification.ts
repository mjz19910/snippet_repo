type YtNotification={
	thumbnail: Thumbnail;
	videoThumbnail: Thumbnail;
	shortMessage: SimpleText;
	sentTimeText: SimpleText;
	navigationEndpoint: WatchEndpoint;
	read: boolean;
	recordClickEndpoint: RecordNotificationInteractionsEndpoint;
	contextualMenu: MenuRenderer;
	trackingParams: string;
	notificationId: `${number}`;
};
