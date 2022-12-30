import {Accessibility} from "../a/Accessibility.js";
import {GeneralCommand} from "../g/GeneralCommand.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {TextRuns} from "../t/TextRuns.js";

export type ButtonRendererData={
	style: "STYLE_DEFAULT"|"STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text?: TextRuns;
	icon: {};
	navigationEndpoint: NavigationEndpoint;
	tooltip: {};
	trackingParams: string;
	accessibilityData: Accessibility;
	command?: GeneralCommand;
	clickTrackingParams: string;
};
