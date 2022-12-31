import {CommandMetadata} from "../b/CommandMetadata.js";
import {UrlEndpointData} from "./UrlEndpointData";

export type UrlEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	urlEndpoint: UrlEndpointData;
};
