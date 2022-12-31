import {YtEndpoint} from "../../_abc/s/YtEndpoint";
import {TextRuns} from "../../_abc/t/TextRuns";
import {Icon} from "../i/Icon";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";
import {Separator} from "../../_abc/s/Separator";

export type MenuServiceItemRenderer={
	icon: Icon<never>;
	serviceEndpoint: YtEndpoint;
	text: TextRuns;
};
export interface MenuServiceItemRendererTP,MenuServiceItemRenderer {}
export interface MenuServiceItemRendererSP extends Separator,MenuServiceItemRenderer {} 
