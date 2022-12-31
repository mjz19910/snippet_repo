import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {CommandMetadata} from "../c/CommandMetadata.js";

export interface ReelWatchEndpoint {
	commandMetadata: CommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData;
}
