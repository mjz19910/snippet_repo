import {ClickTrackingParams} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export interface ContinuationCommandH extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
};
