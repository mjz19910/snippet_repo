import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {TrackingParamsForKey} from "../t/TrackingParamsForKey";
import {WatchEndpointData} from "./WatchEndpointData";
type ParentTrackingParams=TrackingParamsForKey<"parentTrackingParams">;
export type ResolveUrlCommandMetadata=ParentTrackingParams;
type WatchWebCommandMetadata<VideoId>={
  url: VideoId extends string? `/watch?v=${VideoId}`:VideoId;
  webPageType: "WEB_PAGE_TYPE_WATCH";
  rootVe: 3832;
};
type WatchCommandMetadata<VideoId>={
  webCommandMetadata: WatchWebCommandMetadata<VideoId>;
};
export interface WatchEndpoint<VideoId> extends ClickTrackingParams {
  commandMetadata: WatchCommandMetadata<VideoId>;
  watchEndpoint: WatchEndpointData<VideoId>;
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
