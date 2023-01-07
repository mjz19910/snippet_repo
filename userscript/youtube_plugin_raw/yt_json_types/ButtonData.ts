type ButtonData={
	accessibility?: Accessibility|AccessibilityData;
	accessibilityData?: Accessibility|AccessibilityData;
	command?: YtEndpoint;
	icon?: Icon<"SETTINGS">|Icon<"DELETE">|Icon<"NOTIFICATIONS_ACTIVE">;
	isDisabled?: boolean;
	serviceEndpoint?: YtEndpoint;
	navigationEndpoint?: YtEndpoint;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};