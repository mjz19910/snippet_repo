import {ServiceEndpoint} from "./ServiceEndpoint";
import {TextRuns} from "./TextRuns";
import {Icon} from "./Icon";
import {TrackingParams} from "./TrackingParams.js";
import {Separator} from "./Separator";

export type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
};
export interface MenuServiceItemRendererTP extends TrackingParams,MenuServiceItemRenderer {}
export interface MenuServiceItemRendererSP extends Separator,MenuServiceItemRenderer {} 
