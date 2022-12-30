import {ChannelId} from "./ChannelId";
import {ChannelResponse} from "./ChannelResponse";

export type ChannelPageResponse={
	page: "channel";
	endpoint: {};
	response: ChannelResponse;
	url: `/channel/${ChannelId}`;
};
