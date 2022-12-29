import {BrowseResponse} from "../b/BrowseResponse";
import {ChannelResponse} from "../c/ChannelResponse";
import {PlaylistResponse} from "../p/PlaylistResponse.js";
import {SettingsResponse} from "../s/SettingsResponse";
import {ShortsResponse} from "../s/ShortsResponse.js";
import {WatchResponse} from "../w/WatchResponse";

export type JsonDataResponseType=ChannelResponse|WatchResponse|BrowseResponse|ShortsResponse|SettingsResponse|PlaylistResponse;
