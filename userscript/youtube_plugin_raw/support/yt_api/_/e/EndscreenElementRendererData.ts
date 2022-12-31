import {YtEndpoint} from "../b/YtEndpoint.js";
import {HexLen} from "../h/HexLen.js";

export type EndscreenElementRendererData={
	style: "VIDEO"|"CHANNEL";
	image: {},
	left: number,
	width: number,
	top: number,
	aspectRatio: number,
	startMs: `${number}`,
	endMs: `${number}`,
	title: {},
	metadata: {},
	endpoint: YtEndpoint,
	trackingParams: string,
	id: `${HexLen<"2a34eba0",8>}-${HexLen<"e8d5",4>}-${HexLen<"4150",4>}-${HexLen<"89ec",4>}-${HexLen<"deb6fb30b5c8",12>}`,
	thumbnailOverlays: {}[];
};
