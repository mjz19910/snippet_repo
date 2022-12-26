import {Accessibility} from "../a/Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";
import {TrackingParams} from "../t/TrackingParams.js";


export interface MenuRenderer extends TrackingParams {
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
}
