import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";
import {ClickTrackingParams} from "./ClickTrackingParams.js";

export interface ContinuationEndpoint  extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
