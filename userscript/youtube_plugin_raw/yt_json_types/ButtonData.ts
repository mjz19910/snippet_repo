type ButtonData={
	accessibility?: AccessibilityData;
	accessibilityData?: Accessibility;
	command?: CommandEndpoint;
	icon?: Icon<
		[
			"SETTINGS"|"DELETE",
			"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
		][number]
	>;
	isDisabled?: boolean;
	serviceEndpoint?: ServiceEndpointTemplate<{}>;
	navigationEndpoint?: NavigationEndpointRoot;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextWithRuns;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};