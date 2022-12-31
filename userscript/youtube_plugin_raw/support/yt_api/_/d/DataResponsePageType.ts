import {BrowsePageResponse} from "../b/BrowseResponse";
import {ChannelPageResponse} from "../c/ChannelPageResponse";
import {PlaylistPageResponse} from "../p/PlaylistPageResponse";
import {SettingsPageResponse} from "../s/SettingsPageResponse";
import {ShortsPageResponse} from "../s/ShortsPageResponse.js";
import {WatchPageResponse} from "../w/WatchPageResponse";


export type DataResponsePageType=ChannelPageResponse|WatchPageResponse|BrowsePageResponse|ShortsPageResponse|SettingsPageResponse|PlaylistPageResponse;
