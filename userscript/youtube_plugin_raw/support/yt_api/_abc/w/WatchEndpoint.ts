import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {WatchCommandMetadata} from "./WatchCommandMetadata";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpoint extends ClickTrackingParams {
  commandMetadata: WatchCommandMetadata;
  watchEndpoint: WatchEndpointData;
}
