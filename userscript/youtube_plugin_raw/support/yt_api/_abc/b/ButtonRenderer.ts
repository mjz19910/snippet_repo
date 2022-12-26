import {ContinuationCommandH} from "./ContinuationCommandH";
import {TextRuns} from "./TextRuns";
import {TrackingParams} from "./TrackingParams";

export interface ButtonRenderer extends TrackingParams {
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns;
	command: ContinuationCommandH;
};
