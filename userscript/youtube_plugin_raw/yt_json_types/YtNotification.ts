type YtNotification={
	thumbnail: D$Thumbnail;
	videoThumbnail: D$Thumbnail;
	shortMessage: D$SimpleText;
	sentTimeText: D$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractionsEndpoint;
	contextualMenu: R$Menu;
	trackingParams: string;
	notificationId: `${number}`;
};
