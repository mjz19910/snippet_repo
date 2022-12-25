import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";
import {ContinuationEndpoint} from "./ContinuationEndpoint";
import {GhostCards} from "./GhostCards";
import {TextRuns} from "./TextRuns";

export type ContinuationItemRenderer={
	trigger: string;
	continuationEndpoint: ContinuationEndpoint;
	button?: {
		"buttonRenderer": {
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
	};
	ghostCards?: GhostCards;
};
