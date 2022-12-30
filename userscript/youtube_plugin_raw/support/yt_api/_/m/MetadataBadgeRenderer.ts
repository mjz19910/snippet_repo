import {AccessibilityData} from "../a/AccessibilityData";
import {Icon} from "../i/Icon";

export type MetadataBadgeRenderer={
	icon: Icon<never>;
	label: string;
	style: string;
	tooltip: string;
	trackingParams: string;
	accessibilityData: AccessibilityData;
};
