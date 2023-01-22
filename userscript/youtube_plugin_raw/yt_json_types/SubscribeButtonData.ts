type D__SubscribeButton={
	buttonText: R_TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R_TextWithRuns;
	unsubscribedButtonText: R_TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextWithRuns;
	serviceEndpoints?: (E$SubscribeEndpoint|SubscribeButtonData$SignalServiceEndpoint)[];
	subscribeAccessibility: D__Accessibility;
	unsubscribeAccessibility: D__Accessibility;
	notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E$SubscribeEndpoint[];
	onUnsubscribeEndpoints: E$T$SignalService<{}>[];
}|{
	buttonText: R_TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: "UCC-UOdK8-mIjxBQm_ot1T-Q";
	showPreferences: false;
	subscribedButtonText: R_TextWithRuns;
	unsubscribedButtonText: R_TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextWithRuns;
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