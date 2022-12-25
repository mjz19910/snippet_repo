import {Accessibility} from "./Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";


export type MenuRenderer={
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
	trackingParams: string;
};
