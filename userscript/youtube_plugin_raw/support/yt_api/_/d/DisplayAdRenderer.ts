import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {ClickCommand} from "../c/ClickCommand.js";
import {ImpressionEndpoint} from "../i/ImpressionEndpoint.js";
import {MenuRenderer} from "../m/MenuRenderer.js";
import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer.js";
import {ThumbnailRoot} from "../t/ThumbnailRoot";
import {SimpleText} from "../s/SimpleText.js";
import {TextRunsSimpleT} from "../t/TextRunsSimple.js";

export interface DisplayAdRenderer {
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: TextRunsSimpleT<"Create Lasting Wealth">;
	image: ThumbnailRoot;
	bodyText: SimpleText;
	secondaryText: SimpleText;
	badge: MetadataBadgeRenderer;
	menu: MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: ImpressionEndpoint[];
	clickCommand: ClickCommand;
	mediaHoverOverlay: ButtonRenderer;
	mediaBadge: MetadataBadgeRenderer;
	trackingParams: string;
}
