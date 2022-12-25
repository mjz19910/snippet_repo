import {BrowseEndpointH} from "./BrowseEndpointH";
import {OpenPopupActionH} from "./OpenPopupActionH";
import {TrackedCommandMetadataH} from "./TrackedCommandMetadataH";
import {WatchEndpointH} from "./WatchEndpointH";


export type NavigationEndpoint=TrackedCommandMetadataH|OpenPopupActionH|WatchEndpointH|BrowseEndpointH;
