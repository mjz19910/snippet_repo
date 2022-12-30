import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {CommandMetadata} from "../b/CommandMetadata.js";

export interface ReelWatchEndpoint {
	commandMetadata: CommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData;
}
