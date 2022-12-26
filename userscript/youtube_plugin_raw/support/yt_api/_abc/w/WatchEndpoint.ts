import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {CommandMetadata} from "../c/CommandMetadata.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {WatchEndpointData} from "./WatchEndpointData";

export type ResolveUrlCommandMetadata=TrackingParams<"parentTrackingParams">;

export interface WatchEndpoint extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpointData;
}
/*{
    clickTrackingParams: string,
    commandMetadata: {
      webCommandMetadata: {url: `/watch?v=${YtVideoIdStr}`, webPageType: 'WEB_PAGE_TYPE_WATCH', rootVe: 3832},
      resolveUrlCommandMetadata: TrackingParams<"parentTrackingParams">;
    },
    watchEndpoint: {videoId: 'g2U2-i13970'}
  }
 */
