import {AccessibilityData} from "./AccessibilityData";
import {Icon} from "./Icon";
import {TrackingParams} from "./TrackingParams.js";


export type MetadataBadgeRenderer={
	icon?: Icon;
	label?: string;
	style: string;
	tooltip?: string;
	accessibilityData?: AccessibilityData;
}&TrackingParams;
