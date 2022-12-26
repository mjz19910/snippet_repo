import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {CommandMetadata} from "../c/CommandMetadata.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {WatchEndpointData} from "./WatchEndpointData";
type ParentTrackingParams=TrackingParams<"parentTrackingParams">;
export type ResolveUrlCommandMetadata=ParentTrackingParams;

export interface WatchEndpoint<VideoId> extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
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
