import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export type ContinuationCommandH={
	"clickTrackingParams": string;
	"commandMetadata": CommandMetadata;
	continuationCommand?: ContinuationCommand;
};
