import {YtTextType} from "../../yt/YtTextType.js";
import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {ImpressionEndpoint} from "../i/ImpressionEndpoint.js";
import {MenuRenderer} from "../m/MenuRenderer.js";
import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer.js";
import {ThumbnailRoot} from "../t/ThumbnailRoot";

export interface DisplayAdRenderer {
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: YtTextType;
	image: ThumbnailRoot;
	bodyText: YtTextType;
	secondaryText: YtTextType;
	badge: MetadataBadgeRenderer;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: ImpressionEndpoint[];
	clickCommand: {};
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeRenderer;
	trackingParams: string;
}
