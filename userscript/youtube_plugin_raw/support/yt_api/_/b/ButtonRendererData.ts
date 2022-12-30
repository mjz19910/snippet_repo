import {Accessibility} from "../a/Accessibility.js";
import {ContinuationCommandH} from "../c/ContinuationCommandH.js";
import {TextRuns} from "../t/TextRuns.js";

export type ButtonRendererData={
	style: "STYLE_DEFAULT"|"STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text?: TextRuns;
	icon: {};
	navigationEndpoint: {};
	tooltip: {};
	trackingParams: string;
	accessibilityData: Accessibility;
	command?: ContinuationCommandH;
	clickTrackingParams: string;
};
