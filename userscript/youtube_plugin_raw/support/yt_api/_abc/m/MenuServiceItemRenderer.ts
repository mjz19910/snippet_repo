import {ServiceEndpoint} from "../s/ServiceEndpoint";
import {TextRuns} from "../t/TextRuns";
import {Icon} from "../i/Icon";
import {TrackingParamsDef} from "../t/TrackingParams.js";
import {Separator} from "../s/Separator";

export type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
};
export interface MenuServiceItemRendererTP extends TrackingParamsDef,MenuServiceItemRenderer {}
export interface MenuServiceItemRendererSP extends Separator,MenuServiceItemRenderer {} 
