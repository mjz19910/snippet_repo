import {Accessibility} from "../../../../yt_json_types/Accessibility";
import {MenuServiceItem} from "./MenuServiceItem";



export interface MenuRenderer {
	trackingParams: string;
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
}
