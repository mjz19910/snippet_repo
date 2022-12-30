import {CommandMetadata} from "../b/CommandMetadata.js";
import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpoint extends ClickTrackingParams {
  commandMetadata: CommandMetadata;
  watchEndpoint: WatchEndpointData;
  clickTrackingParams: string;
}
