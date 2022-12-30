import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export interface ContinuationCommandH {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
	clickTrackingParams: string;
};
