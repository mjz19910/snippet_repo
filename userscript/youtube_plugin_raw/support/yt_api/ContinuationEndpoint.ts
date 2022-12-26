import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";
import {CT} from "./ClickTrackingParams.js";

export interface ContinuationEndpoint  extends CT {
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
