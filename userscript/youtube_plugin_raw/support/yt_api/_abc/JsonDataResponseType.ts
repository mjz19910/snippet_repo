import {BrowseResponse} from "./b/BrowseResponse.js";
import {ChannelResponse} from "./ChannelResponse.js";
import {PlaylistResponse} from "./p/PlaylistResponse.js";
import {ShortsResponse} from "./s/ShortsResponse.js";
import {SettingsResponse} from "./SettingsResponse.js";
import {WatchResponse} from "./w/WatchResponse.js";

export type JsonDataResponseType=ChannelResponse|WatchResponse|BrowseResponse|ShortsResponse|SettingsResponse|PlaylistResponse;
