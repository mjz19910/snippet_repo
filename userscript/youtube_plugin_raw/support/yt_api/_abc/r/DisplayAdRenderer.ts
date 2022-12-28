import {ClickCommand} from "../c/ClickCommand.js";
import {ImpressionEndpoint} from "../i/ImpressionEndpoint.js";
import {SimpleTextFixmeValueNeeded} from "../s/SimpleText";
import {TrackingParams} from "../t/TrackingParams.js";
import {ButtonRenderer} from "./ButtonRenderer";
import {MenuRenderer} from "./MenuRenderer";
import {MetadataBadgeRenderer} from "./MetadataBadgeRenderer.js";
import {AdTitle_0,TN} from "./RenderingContent";

export interface DisplayAdRenderer extends TrackingParams {
	"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	"titleText": AdTitle_0;
	"image": TN;
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
