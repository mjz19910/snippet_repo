type D$Notification={
	thumbnail: D$Thumbnail;
	videoThumbnail: D$Thumbnail;
	shortMessage: D$SimpleText;
	sentTimeText: D$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractions;
	contextualMenu: R$Menu;
	trackingParams: string;
	notificationId: `${number}`;
};