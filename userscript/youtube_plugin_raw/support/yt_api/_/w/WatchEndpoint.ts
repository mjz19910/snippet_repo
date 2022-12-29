import {ClickTrackingParams} from "../../_abc/c/ClickTrackingParams.js";
import {WatchCommandMetadata} from "./WatchCommandMetadata";
import {WatchEndpointData} from "./WatchEndpointData.1";

export interface WatchEndpoint extends ClickTrackingParams {
  commandMetadata: WatchCommandMetadata;
  watchEndpoint: WatchEndpointData;
}
