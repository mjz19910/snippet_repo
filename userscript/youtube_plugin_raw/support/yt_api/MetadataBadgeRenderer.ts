import {AccessibilityData} from "./AccessibilityData";
import {Icon} from "./Icon";


export type MetadataBadgeRenderer={
	icon?: Icon;
	label?: string;
	style: string;
	tooltip?: string;
	trackingParams: string;
	accessibilityData?: AccessibilityData;
};
