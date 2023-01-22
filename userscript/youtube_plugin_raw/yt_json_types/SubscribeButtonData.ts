type D__SubscribeButton={
	buttonText: R$TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R$TextWithRuns;
	unsubscribedButtonText: R$TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R$TextWithRuns;
	serviceEndpoints?: (E$SubscribeEndpoint|SubscribeButtonData$SignalServiceEndpoint)[];
	subscribeAccessibility: D__Accessibility;
	unsubscribeAccessibility: D__Accessibility;
	notificationPreferenceButton?: R$SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E$SubscribeEndpoint[];
	onUnsubscribeEndpoints: E$T$SignalService<{}>[];
}|{
	buttonText: R$TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: "UCC-UOdK8-mIjxBQm_ot1T-Q";
	showPreferences: false;
	subscribedButtonText: R$TextWithRuns;
	unsubscribedButtonText: R$TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R$TextWithRuns;
	serviceEndpoints: E$SubscribeEndpoint[];
	subscribeAccessibility: D__Accessibility;
	unsubscribeAccessibility: D__Accessibility;
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