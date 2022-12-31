import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint.js";
import {CommandMetadata} from "./CommandMetadata.js";

export type YtEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	signalServiceEndpoint: SignalServiceEndpointData;
};
