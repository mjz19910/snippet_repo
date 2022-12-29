import {ServiceEndpoint} from "../../_abc/s/ServiceEndpoint";
import {TextRuns} from "../../_abc/t/TextRuns";
import {Icon} from "../../_abc/i/Icon";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";
import {Separator} from "../../_abc/s/Separator";

export type MenuServiceItemRenderer={
	icon: Icon<never>;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
};
export interface MenuServiceItemRendererTP extends TrackingParams,MenuServiceItemRenderer {}
export interface MenuServiceItemRendererSP extends Separator,MenuServiceItemRenderer {} 
