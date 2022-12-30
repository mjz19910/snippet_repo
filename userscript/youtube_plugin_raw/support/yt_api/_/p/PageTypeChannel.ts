import {ChannelEndpoint} from "../c/ChannelEndpoint";
import {ChannelResponse} from "../c/ChannelResponse";

export type PageTypeChannel={
	pageType: "channel";
	endpoint: ChannelEndpoint;
	response: ChannelResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
