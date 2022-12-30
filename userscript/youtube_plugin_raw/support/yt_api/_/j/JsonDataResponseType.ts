import {BrowseResponseContent} from "../b/BrowseResponseContent.js";
import {ChannelResponse} from "../c/ChannelResponse.js";
import {PageResponseContent} from "../p/PageResponseContent";
import {SettingsResponseContent} from "../s/SettingsResponseContent.js";
import {ShortsResponse} from "../s/ShortsResponse.js";
import {WatchResponseContent} from "../w/WatchResponseContent.js";

export type JsonDataResponseType=ShortsResponse|ChannelResponse|WatchResponseContent|BrowseResponseContent|SettingsResponseContent|PageResponseContent;
