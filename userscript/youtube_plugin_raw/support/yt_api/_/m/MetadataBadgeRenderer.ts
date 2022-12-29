import {AccessibilityData} from "../a/AccessibilityData";
import {Icon} from "../i/Icon";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";

export interface MetadataBadgeRenderer extends TrackingParams {
	icon: Icon<never>;
	label: string;
	style: string;
	tooltip: string;
	accessibilityData: AccessibilityData;
}
