import {ChannelEndpoint} from "./c/ChannelEndpoint";
import {ChannelResponse} from "./ChannelResponse";

export type WebPageTypeChannel={
	pageType: "channel";
	endpoint: ChannelEndpoint;
	response: ChannelResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};