import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";
import {TextRuns} from "./TextRuns";


export type ButtonRenderer={
	"style": "STYLE_SUGGESTIVE";
	"size": "SIZE_DEFAULT";
	"isDisabled": false;
	"text": TextRuns;
	trackingParams: string;
	"command": {
		"clickTrackingParams": string;
		"commandMetadata": CommandMetadata;
		continuationCommand?: ContinuationCommand;
	};
};
