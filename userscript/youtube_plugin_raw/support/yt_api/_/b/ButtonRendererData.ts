import {ContinuationCommandH} from "../c/ContinuationCommandH.js";
import {TextRuns} from "../../_abc/t/TextRuns.js";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";

export interface ButtonRendererData extends TrackingParams {
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: boolean;
	text: TextRuns;
	command: ContinuationCommandH;
};
