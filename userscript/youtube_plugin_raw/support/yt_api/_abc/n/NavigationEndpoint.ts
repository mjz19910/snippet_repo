import {BrowseEndpoint} from "../../_/b/BrowseEndpoint.js";
import {OpenPopupActionH} from "../../_/o/OpenPopupActionH";
import {TrackedCommandMetadataH} from "../t/TrackedCommandMetadataH";
import {WatchEndpoint} from "../../_/w/WatchEndpoint";


export type NavigationEndpoint=TrackedCommandMetadataH|OpenPopupActionH|WatchEndpoint|BrowseEndpoint;
