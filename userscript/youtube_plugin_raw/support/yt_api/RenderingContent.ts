import {SimpleText} from "./SimpleText";
import {ImpressionEndpoint} from "./ImpressionEndpoint";
import {ThumbnailH} from "./ThumbnailH.js";
import {MetadataBadgeRenderer} from "./MetadataBadgeRenderer";
import {NavigationEndpoint} from "./NavigationEndpoint";
import {Icon} from "./Icon";
import {ClickCommand} from "./ClickCommand";
import {TrackingParams} from "./TrackingParams.js";

export type RenderingContent={
	"displayAdRenderer": TrackingParams&{
		"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
		"titleText": {
			"simpleText": "Create Lasting Wealth";
		};
		"image": TrackingParams&{
			thumbnail: ThumbnailH;
		};
		// spell:ignore Linqto
		"bodyText": SimpleText;
		"secondaryText": SimpleText;
		"badge": {
			"metadataBadgeRenderer": MetadataBadgeRenderer;
		};
		"menu": {
			"menuRenderer": {
				"items": [
					{
						"menuNavigationItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "My Ad Centre";
									}
								];
							};
							"icon": {
								"iconType": "INFO";
							};
							navigationEndpoint: NavigationEndpoint;
						}&TrackingParams;
					}
				];
				"accessibility": {
					"accessibilityData": {
						"label": "Action menu";
					};
				};
			}&TrackingParams;
		};
		"ctaButton": {
			"buttonRenderer": {
				"style": "STYLE_PRIMARY";
				"text": SimpleText;
				"icon": Icon;
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			}&TrackingParams;
		};
		impressionEndpoints: ImpressionEndpoint[];
		"clickCommand": ClickCommand;
		"mediaHoverOverlay": {
			"buttonRenderer": {
				"style": "STYLE_LIGHT_TEXT";
				"text": {
					"simpleText": "Visit site";
				};
				"icon": {
					"iconType": "EXTERNAL_LINK";
				};
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			}&TrackingParams;
		};
		"mediaBadge": {
			"metadataBadgeRenderer": {
				"icon": {
					"iconType": "EXTERNAL_LINK";
				};
				"style": "BADGE_STYLE_TYPE_BLACK";
			}&TrackingParams;
		};
	};
};
