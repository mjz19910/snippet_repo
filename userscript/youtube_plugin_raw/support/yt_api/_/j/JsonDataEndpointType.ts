import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {ChannelEndpoint} from "../c/ChannelEndpoint.js";
import {SettingsEndpoint} from "../p/SettingsEndpoint";
import {PlaylistEndpoint} from "../p/PlaylistEndpoint.js";
import {ShortsEndpoint} from "../s/ShortsEndpoint.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type JsonDataEndpointType=ChannelEndpoint|WatchEndpoint|BrowseEndpoint|ShortsEndpoint|SettingsEndpoint|PlaylistEndpoint;
