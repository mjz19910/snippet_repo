import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export interface ContinuationCommandH extends CT {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
};
