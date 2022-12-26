import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";
import {TrackClick} from "./TrackClick.js";

export interface ContinuationEndpoint  extends TrackClick {
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
