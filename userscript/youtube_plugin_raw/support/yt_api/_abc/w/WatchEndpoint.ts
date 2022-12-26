import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {CommandMetadata} from "../c/CommandMetadata.js";
import {WatchEndpointData} from "./WatchEndpointData";

export interface WatchEndpoint extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpointData;
}
/*{
    clickTrackingParams: 'IhMItJqj-eyX_AIV2UVMCB0lZAG8MghleHRlcm5hbA==',
    commandMetadata: {
      webCommandMetadata: {url: '/watch?v=g2U2-i13970', webPageType: 'WEB_PAGE_TYPE_WATCH', rootVe: 3832},
      resolveUrlCommandMetadata: {
        parentTrackingParams: 'CPICEKQwGAEiEwiKtKP14Zf8AhUk4MQKHWZWCXgyB3JlbGF0ZWRIubGszNak3cvFAZoBBQgBEPgd'
      }
    },
    watchEndpoint: {videoId: 'g2U2-i13970'}
  }
 */
