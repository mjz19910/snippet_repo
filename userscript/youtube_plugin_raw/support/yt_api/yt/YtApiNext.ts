import {ResponseContext} from "../_/g/GeneralContext";
import {JsonDataEndpointType} from "../_/j/JsonDataEndpointType.js";

export type YtApiNext={
	onResponseReceivedEndpoints: JsonDataEndpointType[];
	responseContext: ResponseContext;
	trackingParams: string;
};
