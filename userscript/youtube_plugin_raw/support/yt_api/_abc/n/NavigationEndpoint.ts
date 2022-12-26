import {BrowseEndpointH} from "../b/BrowseEndpointH";
import {OpenPopupActionH} from "../o/OpenPopupActionH";
import {TrackedCommandMetadataH} from "../t/TrackedCommandMetadataH";
import {WatchEndpoint} from "../w/WatchEndpoint";


export type NavigationEndpoint<T>=TrackedCommandMetadataH|OpenPopupActionH|WatchEndpoint<T>|BrowseEndpointH;
