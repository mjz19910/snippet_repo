import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export interface ContinuationEndpoint  {
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
	clickTrackingParams: string;
};
