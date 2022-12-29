import {ClickCommand} from "../../_abc/c/ClickCommand.js";
import {ImpressionEndpoint} from "../../_abc/i/ImpressionEndpoint.js";
import {SimpleTextFixmeValueNeeded} from "../../_abc/s/SimpleText";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";
import {ButtonRenderer} from "../b/ButtonRenderer_0";
import {MenuRenderer} from "../m/MenuRenderer_0";
import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer_0.js";
import {AdTitle_0,TN} from "../../_abc/r/RenderingContent";

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
