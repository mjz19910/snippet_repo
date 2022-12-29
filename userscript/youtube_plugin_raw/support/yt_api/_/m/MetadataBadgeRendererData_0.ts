import {TrackingParams} from "../../_abc/t/TrackingParams.js";
import {IconExternalLink} from "../../_abc/i/IconExternalLink";

export interface MetadataBadgeRendererData extends TrackingParams {
	"icon": IconExternalLink;
	"style": "BADGE_STYLE_TYPE_BLACK";
}
