type SubscribeButton={
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
	notificationPreferenceButton?: R$SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E$SubscribeEndpoint[];
	onUnsubscribeEndpoints: E$T$SignalService<{}>[];
}|{
	buttonText: D$TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: "UCC-UOdK8-mIjxBQm_ot1T-Q";
	showPreferences: false;
	subscribedButtonText: D$TextWithRuns;
	unsubscribedButtonText: D$TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: D$TextWithRuns;
	serviceEndpoints: E$SubscribeEndpoint[];
	subscribeAccessibility: A$Accessibility;
	unsubscribeAccessibility: A$Accessibility;
};
type SubscribeButtonData$SignalServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
		}
	};
	signalServiceEndpoint: Signal$ClientSignal;
};