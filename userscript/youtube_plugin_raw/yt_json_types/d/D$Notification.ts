type D$Notification={
	thumbnail: D$Thumbnail;
	videoThumbnail: D$Thumbnail;
	shortMessage: R$SimpleText;
	sentTimeText: R$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractions;
	contextualMenu: R$Menu;
	trackingParams: string;
	notificationId: `${number}`;
};