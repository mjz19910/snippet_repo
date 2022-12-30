import {Accessibility} from "../a/Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";



export interface MenuRenderer {
	trackingParams: string;
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
}
