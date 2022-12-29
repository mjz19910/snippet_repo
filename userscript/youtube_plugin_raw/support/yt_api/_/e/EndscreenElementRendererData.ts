import {HexLen} from "../../_abc/p/HexLen";

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
	endpoint: {},
	trackingParams: string,
	id: `${HexLen<"2a34eba0",8>}-${HexLen<"e8d5",4>}-${HexLen<"4150",4>}-${HexLen<"89ec",4>}-${HexLen<"deb6fb30b5c8",12>}`,
	thumbnailOverlays: {}[];
};
