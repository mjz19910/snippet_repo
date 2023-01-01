import {ReelWatchEndpointData} from "./ReelWatchEndpointData";
import {CommandMetadata} from "../../json/CommandMetadata.js";

export interface ReelWatchEndpoint {
	commandMetadata: CommandMetadata;
	reelWatchEndpoint: ReelWatchEndpointData;
}
