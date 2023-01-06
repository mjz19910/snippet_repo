import {Accessibility} from "./Accessibility.js";

export type MenuData={
	trackingParams: string;
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
};