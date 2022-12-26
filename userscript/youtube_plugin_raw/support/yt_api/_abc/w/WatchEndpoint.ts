import {CommandMetadata} from "./CommandMetadata.js";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpoint {
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpointData;
};
