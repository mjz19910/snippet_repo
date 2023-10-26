import {T_IdTemplate,D_UserIdStr,D_Thumbnail} from "../../../d/group_D.ts";
import {E_VE3611} from "../../../e/GR_E_VE.ts";
import {G_Text} from "../../../ghi/group_G.ts";
import {R_SubscribeButton} from "../../group_R.ts";

export type D_GridChannel={
	channelId: T_IdTemplate<"UC",D_UserIdStr>;
	thumbnail: D_Thumbnail;
	videoCountText: G_Text;
	subscriberCountText: G_Text;
	navigationEndpoint: E_VE3611;
	title: G_Text;
	subscribeButton: R_SubscribeButton;
	trackingParams: string;
};
export type R_GridChannel={gridChannelRenderer: D_GridChannel;};
