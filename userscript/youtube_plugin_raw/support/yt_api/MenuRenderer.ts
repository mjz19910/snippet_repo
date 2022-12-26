import {Accessibility} from "./Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";
import {TrackingParams} from "./TrackingParams.js";


export interface MenuRenderer extends TrackingParams {
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
}
