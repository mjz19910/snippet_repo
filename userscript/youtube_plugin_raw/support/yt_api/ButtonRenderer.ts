import {ContinuationCommandH} from "./ContinuationCommandH";
import {TextRuns} from "./TextRuns";

export type ButtonRenderer={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns;
	trackingParams: string;
	command: ContinuationCommandH;
};
