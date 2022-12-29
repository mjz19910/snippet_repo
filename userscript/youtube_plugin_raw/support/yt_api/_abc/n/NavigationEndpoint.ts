import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {OpenPopupActionH} from "../o/OpenPopupActionH";
import {TrackedCommandMetadataH} from "../t/TrackedCommandMetadataH";
import {WatchEndpoint} from "../w/WatchEndpoint";


export type NavigationEndpoint=TrackedCommandMetadataH|OpenPopupActionH|WatchEndpoint|BrowseEndpoint;
