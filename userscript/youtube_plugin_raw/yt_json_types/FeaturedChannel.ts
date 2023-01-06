import {SubscribeButtonRenderer} from "./SubscribeButtonRenderer";
import {Thumbnail} from "./Thumbnail.js";
import {VE3611} from "./VE3611";

export type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail;
	trackingParams: string;
	navigationEndpoint: VE3611.navigationEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};
