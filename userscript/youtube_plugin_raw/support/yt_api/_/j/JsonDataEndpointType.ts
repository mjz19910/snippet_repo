import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {SettingsEndpoint} from "../p/SettingsEndpoint";
import {PlaylistEndpoint} from "../p/PlaylistEndpoint.js";
import {ReelWatchEndpoint} from "../s/ReelWatchEndpoint.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type JsonDataEndpointType=WatchEndpoint|BrowseEndpoint|ReelWatchEndpoint|SettingsEndpoint|PlaylistEndpoint;
