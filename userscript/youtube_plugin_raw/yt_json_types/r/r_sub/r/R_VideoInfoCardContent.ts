import {D_Thumbnail} from "../../../d/group_D.js";
import {E_Watch} from "../../../e/E.js";
import {G_Text} from "../../../ghi/group_G.js";

export type D_VideoInfoCardContent={
	videoThumbnail: D_Thumbnail;
	lengthString: G_Text;
	videoTitle: G_Text;
	channelName: G_Text;
	viewCountText: G_Text;
	action: E_Watch;
	trackingParams: string;
};