type ButtonIcon=Icon<[
	"SETTINGS"|"DELETE",
	"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
][number]>;

type ButtonData={
	accessibility?: AccessibilityDataContent;
	accessibilityData?: AccessibilityData;
	command?: CommandEndpoint;
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: ServiceEndpointTemplate<{}>;
	navigationEndpoint?: NavigationEndpointRoot;
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextWithRuns;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};