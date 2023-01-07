type ButtonData={
	accessibility?: Accessibility|AccessibilityData;
	accessibilityData?: Accessibility|AccessibilityData;
	command?: YtEndpoint;
	icon?: Icon<
		[
			"SETTINGS"|"DELETE",
			"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
		][number]
	>;
	isDisabled?: boolean;
	serviceEndpoint?: YtEndpoint;
	navigationEndpoint?: YtEndpoint;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};