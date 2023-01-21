type SubscribeButtonData={
	buttonText: D$TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: D$TextWithRuns;
	unsubscribedButtonText: D$TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: D$TextWithRuns;
	serviceEndpoints?: (E$SubscribeEndpoint|SubscribeButtonData$SignalServiceEndpoint)[];
	subscribeAccessibility: A$Accessibility;
	unsubscribeAccessibility: A$Accessibility;
	notificationPreferenceButton?: SubscriptionNotificationToggleButtonRenderer;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E$SubscribeEndpoint[];
	onUnsubscribeEndpoints: E$SignalServiceEndpoint[];
};
type SubscribeButtonData$SignalServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
		}
	};
	signalServiceEndpoint: E$Signal_ClientSignal;
};