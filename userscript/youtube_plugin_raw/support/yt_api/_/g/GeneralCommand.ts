import {CommandMetadata} from "../c/CommandMetadata";
import {ContinuationCommand} from "../c/ContinuationCommand";

export interface GeneralCommand {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
	clickTrackingParams: string;
};
