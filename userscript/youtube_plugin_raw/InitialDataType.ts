import {BrowseResponse} from "./support/yt_api/_abc/b/BrowseResponse.js";
import {ShortsResponse} from "./support/yt_api/_abc/s/ShortsResponse.js";
import {WatchResponse} from "./support/yt_api/_abc/w/WatchResponse.js";
import {ChannelResponse} from "./support/yt_api/_abc/_yt/ChannelResponse.js";
import {SettingsResponse} from "./support/yt_api/_abc/_yt/SettingsResponse.js";
import {YTNavigateFinishEventDetail} from "./youtube_plugin.user.js";

export type ResponseType=ChannelResponse|WatchResponse|BrowseResponse|ShortsResponse|SettingsResponse;

export type InitialDataType=YTNavigateFinishEventDetail['response'];
