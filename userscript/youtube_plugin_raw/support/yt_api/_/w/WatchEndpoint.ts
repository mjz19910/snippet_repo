import {CommandMetadata} from "../b/CommandMetadata.js";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpoint {
  commandMetadata: CommandMetadata;
  watchEndpoint: WatchEndpointData;
  clickTrackingParams: string;
}
