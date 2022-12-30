import {ContinuationCommandH} from "../c/ContinuationCommandH.js";
import {TextRuns} from "../t/TextRuns.js";

export type ButtonRendererData={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	trackingParams: string;
	isDisabled: boolean;
	text: TextRuns;
	command: ContinuationCommandH;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	icon: {};
	navigationEndpoint: {};
	tooltip: {};
	trackingParams: string;
	accessibilityData: {};
};
