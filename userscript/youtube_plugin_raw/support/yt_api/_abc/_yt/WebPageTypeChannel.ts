import {ChannelEndpoint} from "./ChannelEndpoint";
import {ChannelResponse} from "./ChannelResponse";

export type WebPageTypeChannel={
	endpoint: ChannelEndpoint;
	pageType: "channel";
	fromHistory: boolean;
	response: ChannelResponse;
	navigationDoneMs: number;
};
