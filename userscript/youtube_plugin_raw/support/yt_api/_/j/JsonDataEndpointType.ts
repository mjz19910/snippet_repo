import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {ChannelEndpoint} from "../../_abc/c/ChannelEndpoint.js";
import {SettingsEndpoint} from "../../_abc/p/PageTypeSettings.js";
import {PlaylistEndpoint} from "../../_abc/p/PlaylistEndpoint.js";
import {ShortsEndpoint} from "../../_abc/s/ShortsEndpoint.js";
import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type JsonDataEndpointType=ChannelEndpoint|WatchEndpoint|BrowseEndpoint|ShortsEndpoint|SettingsEndpoint|PlaylistEndpoint;
