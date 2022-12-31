import {CommandMetadata} from "../c/CommandMetadata";
import {ContinuationCommand} from "../c/ContinuationCommand";
import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";

export interface GeneralCommand {
	commandMetadata: CommandMetadata;
	continuationCommand?: ContinuationCommand;
	signalServiceEndpoint?: SignalServiceEndpointData;
	clickTrackingParams: string;
};
