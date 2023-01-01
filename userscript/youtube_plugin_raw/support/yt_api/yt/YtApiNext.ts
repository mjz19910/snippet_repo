import {ResponseContext} from "../_/g/json/GeneralContext";
import {JsonDataEndpointType} from "../_/j/JsonDataEndpointType.js";

export type YtApiNext={
	onResponseReceivedEndpoints: JsonDataEndpointType[];
	responseContext: ResponseContext;
	trackingParams: string;
};
