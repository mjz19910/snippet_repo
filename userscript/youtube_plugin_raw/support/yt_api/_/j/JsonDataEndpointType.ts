import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {ChannelEndpoint} from "../c/ChannelEndpoint.js";
import {SettingsEndpoint} from "../PageTypeSettings.js";
import {PlaylistEndpoint} from "../PlaylistEndpoint.js";
import {ShortsEndpoint} from "../ShortsEndpoint.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type JsonDataEndpointType=ChannelEndpoint|WatchEndpoint|BrowseEndpoint|ShortsEndpoint|SettingsEndpoint|PlaylistEndpoint;
