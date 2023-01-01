import {AccessibilityData} from "../../../../yt_json_types/AccessibilityData";
import {Icon} from "../../../../yt_json_types/Icon";

export type MetadataBadgeRenderer={
	icon: Icon<never>;
	label: string;
	style: string;
	tooltip: string;
	trackingParams: string;
	accessibilityData: AccessibilityData;
};
