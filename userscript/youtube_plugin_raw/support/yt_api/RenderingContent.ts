import {SimpleText} from "./SimpleText";
import {ImpressionEndpoint} from "./ImpressionEndpoint";
import {ThumbnailHolder} from "./ThumbnailHolder";
import {MetadataBadgeRenderer} from "./MetadataBadgeRenderer";
import {NavigationEndpoint} from "./NavigationEndpoint";
import {Icon} from "./Icon";
import {ClickCommand} from "./ClickCommand";

export type RenderingContent={
	"displayAdRenderer": {
		trackingParams: string;
		"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
		"titleText": {
			"simpleText": "Create Lasting Wealth";
		};
		"image": {
			thumbnail: ThumbnailHolder;
			trackingParams: string;
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
							trackingParams: string;
						};
					}
				];
				trackingParams: string;
				"accessibility": {
					"accessibilityData": {
						"label": "Action menu";
					};
				};
			};
		};
		"ctaButton": {
			"buttonRenderer": {
				"style": "STYLE_PRIMARY";
				"text": SimpleText;
				"icon": Icon;
				trackingParams: string;
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			};
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
				trackingParams: string;
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			};
		};
		"mediaBadge": {
			"metadataBadgeRenderer": {
				"icon": {
					"iconType": "EXTERNAL_LINK";
				};
				"style": "BADGE_STYLE_TYPE_BLACK";
				trackingParams: string;
			};
		};
	};
};
