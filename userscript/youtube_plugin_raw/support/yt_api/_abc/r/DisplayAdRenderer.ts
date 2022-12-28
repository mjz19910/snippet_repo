import {ClickCommand} from "../c/ClickCommand.js";
import {ImpressionEndpoint} from "../i/ImpressionEndpoint.js";
import {SimpleText} from "../s/SimpleText.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {AdTitle_0,TN,BG,MR,BTN,MHO,metadataBadgeRenderer} from "./RenderingContent";

export interface DisplayAdRenderer extends TrackingParams {
	"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	"titleText": AdTitle_0;
	"image": TN;
	// spell:ignore Linqto
	"bodyText": SimpleText;
	"secondaryText": SimpleText;
	"badge": BG;
	"menu": MR;
	"ctaButton": BTN;
	impressionEndpoints: ImpressionEndpoint[];
	clickCommand: ClickCommand;
	"mediaHoverOverlay": MHO;
	"mediaBadge": metadataBadgeRenderer;
}
