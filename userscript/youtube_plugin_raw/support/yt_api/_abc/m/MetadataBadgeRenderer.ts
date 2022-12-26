import {AccessibilityData} from "../a/AccessibilityData";
import {Icon} from "../i/Icon";
import {TrackingParams} from "../t/TrackingParams.js";

export interface MetadataBadgeRenderer extends TrackingParams {
	icon: Icon;
	label: string;
	style: string;
	tooltip: string;
	accessibilityData: AccessibilityData;
}
