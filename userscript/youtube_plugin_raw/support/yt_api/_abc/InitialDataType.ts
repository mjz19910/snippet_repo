import {YTNavigateFinishEventDetail} from "../yt/YTNavigateFinishEventDetail.js";
import {BrowseResponse} from "./b/BrowseResponse.js";
import {ChannelResponse} from "./ChannelResponse.js";
import {PlaylistResponse} from "./p/PlaylistResponse.js";
import {ShortsResponse} from "./s/ShortsResponse.js";
import {SettingsResponse} from "./SettingsResponse.js";
import {WatchResponse} from "./w/WatchResponse.js";

export type ResponseType=ChannelResponse|WatchResponse|BrowseResponse|ShortsResponse|SettingsResponse|PlaylistResponse;

export type InitialDataType=ResponseType;
function check(data: YTNavigateFinishEventDetail) {
	const types_assert: ResponseType=data.response;
	return types_assert;
}
export const do_check=function() {
	check({} as YTNavigateFinishEventDetail);
};
