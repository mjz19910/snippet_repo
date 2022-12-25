import {CommandMetadata} from "./CommandMetadata";
import {ContinuationCommand} from "./ContinuationCommand";

export type ContinuationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
