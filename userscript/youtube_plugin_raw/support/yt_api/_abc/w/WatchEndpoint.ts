import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {TrackingParamsForKey} from "../t/TrackingParamsForKey";
import {WatchEndpointData} from "./WatchEndpointData";
type ParentTrackingParams=TrackingParamsForKey<"parentTrackingParams">;
export type ResolveUrlCommandMetadata=ParentTrackingParams;
type WatchWebCommandMetadata={
  url: `/watch?v=${string}`;
  webPageType: "WEB_PAGE_TYPE_WATCH";
  rootVe: 3832;
};
type WatchCommandMetadata={
  webCommandMetadata: WatchWebCommandMetadata;
};
export interface WatchEndpoint extends ClickTrackingParams {
  commandMetadata: WatchCommandMetadata;
  watchEndpoint: WatchEndpointData;
}
/*{
    clickTrackingParams: string,
    commandMetadata: {
      webCommandMetadata: {url: `/watch?v=${YtVideoIdStr}`, webPageType: 'WEB_PAGE_TYPE_WATCH', rootVe: 3832},
      resolveUrlCommandMetadata: ParentTrackingParams;
    },
    watchEndpoint: {videoId: 'g2U2-i13970'}
  }
 */
