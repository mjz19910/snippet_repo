import {Accessibility} from "./Accessibility.js";
import {MenuServiceItem} from "./MenuServiceItem.js";

export type MenuData={
	trackingParams: string;
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
};