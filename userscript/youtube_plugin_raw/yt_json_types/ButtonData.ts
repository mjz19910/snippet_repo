import {Accessibility} from "./Accessibility.js";

export type ButtonData={
	accessibility?: Accessibility|AccessibilityData;
	accessibilityData?: Accessibility|AccessibilityData;
	command?: YtEndpoint;
	icon?: Icon<"SETTINGS">|Icon<"DELETE">;
	isDisabled?: boolean;
	serviceEndpoint?: YtEndpoint;
	navigationEndpoint?: YtEndpoint;
	size?: ButtonSizeType;
	style?: ButtonStyleType;
	text?: TextT;
	trackingParams?: string;
	targetId?: YtTargetIdType;
};