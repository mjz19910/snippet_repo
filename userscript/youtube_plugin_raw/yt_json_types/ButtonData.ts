type ButtonIcon=Icon<[
	"SETTINGS"|"DELETE",
	"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
][number]>;

type ButtonData={
	accessibility?: AccessibilityData;
	accessibilityData?: Accessibility;
	command?: {};
	icon?: ButtonIcon;
	isDisabled?: boolean;
	serviceEndpoint?: {};
	navigationEndpoint?: {};
	tooltip?: string;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextWithRuns;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};