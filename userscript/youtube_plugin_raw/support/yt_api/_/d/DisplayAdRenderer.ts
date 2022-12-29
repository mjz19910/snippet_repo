import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {ClickCommand} from "../c/ClickCommand.js";
import {ImpressionEndpoint} from "../ImpressionEndpoint.js";
import {MenuRenderer} from "../m/MenuRenderer.js";
import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer.js";
import {ThumbnailRoot} from "../t/ThumbnailRoot";
import {AdTitle_0} from "../a/AdTitle_0";
import {SimpleTextFixmeValueNeeded} from "../s/SimpleText.js";
import {TrackingParams} from "../TrackingParams.js";

export interface DisplayAdRenderer extends TrackingParams {
	"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	"titleText": AdTitle_0;
	image: ThumbnailRoot;
	// spell:ignore Linqto
	"bodyText": SimpleTextFixmeValueNeeded;
	"secondaryText": SimpleTextFixmeValueNeeded;
	"badge": MetadataBadgeRenderer;
	"menu": MenuRenderer;
	ctaButton: ButtonRenderer;
	impressionEndpoints: ImpressionEndpoint[];
	clickCommand: ClickCommand;
	"mediaHoverOverlay": ButtonRenderer;
	"mediaBadge": MetadataBadgeRenderer;
}
