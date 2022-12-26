import {AccessibilityData} from "../a/AccessibilityData";
import {Icon} from "../i/Icon";
import {TrackingParamsDef} from "../t/TrackingParams.js";

export interface MetadataBadgeRenderer extends TrackingParamsDef {
	icon: Icon;
	label: string;
	style: string;
	tooltip: string;
	accessibilityData: AccessibilityData;
}
