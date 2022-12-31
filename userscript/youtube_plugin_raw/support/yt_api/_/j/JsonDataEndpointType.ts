import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {PlaylistEndpoint} from "../p/PlaylistEndpoint.js";
import {SettingsEndpoint} from "../p/SettingsEndpoint";
import {ReloadContinuationItemsCommand} from "../r/ReloadContinuationItemsCommand.js";
import {ReelWatchEndpoint} from "../s/ReelWatchEndpoint.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type JsonDataEndpointType=ReloadContinuationItemsCommand|WatchEndpoint|BrowseEndpoint|ReelWatchEndpoint|SettingsEndpoint|PlaylistEndpoint;
