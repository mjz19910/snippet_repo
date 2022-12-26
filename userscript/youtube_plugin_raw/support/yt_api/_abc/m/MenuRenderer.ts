import {Accessibility} from "../a/Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";
import {TrackingParamsDef} from "../t/TrackingParams.js";


export interface MenuRenderer extends TrackingParamsDef {
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
}
