import {BrowseEndpointH} from "./BrowseEndpointH";
import {OpenPopupActionH} from "./OpenPopupActionH";
import {TrackedCommandMetadataH} from "./TrackedCommandMetadataH";
import {WatchEndpoint} from "./WatchEndpoint";


export type NavigationEndpoint=TrackedCommandMetadataH|OpenPopupActionH|WatchEndpoint|BrowseEndpointH;
