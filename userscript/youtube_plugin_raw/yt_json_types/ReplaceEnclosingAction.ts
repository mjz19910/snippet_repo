type ReplaceEnclosingAction={
	clickTrackingParams: string;
	replaceEnclosingAction: ItemTemplate<NotificationTextRenderer|{
		reelDismissalActionRenderer: {
			onDismissalCompletionRenderer: NotificationActionRenderer;
			trackingParams: string;
		};
	}>;
};
