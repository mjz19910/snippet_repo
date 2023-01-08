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
	serviceEndpoint?: ServiceEndpoint<{}>;
	navigationEndpoint?: NavigationEndpoint<{},never>;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};
type CommandEndpoint={};