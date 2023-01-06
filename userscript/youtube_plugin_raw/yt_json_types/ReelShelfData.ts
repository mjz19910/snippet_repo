import {ReelItemRenderer} from "./ReelItemRenderer";
import {TextT} from "./TextT.js";
export type ReelShelfData={
	title: TextT;
	items: ReelItemRenderer[];
	trackingParams: string;
	icon: Icon<"YOUTUBE_SHORTS_BRAND_24">;
};