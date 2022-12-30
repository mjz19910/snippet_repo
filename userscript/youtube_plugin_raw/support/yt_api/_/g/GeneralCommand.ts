import {CommandMetadata} from "../c/CommandMetadata";
import {ContinuationCommand} from "../c/ContinuationCommand";
import {SignalServiceEndpoint} from "../s/SignalServiceEndpoint.js";

export interface GeneralCommand {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
	signalServiceEndpoint?: SignalServiceEndpoint;
	clickTrackingParams: string;
};
