import {Accessibility} from "../a/Accessibility.js";
import {MenuRendererH} from "../m/MenuRendererH.js";
import {MetadataBadgeRenderers} from "../m/MetadataBadgeRenderers.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {SimpleTextFixmeValueNeeded} from "../s/SimpleText.js";
import {TextRuns} from "../t/TextRuns.js";
import {ThumbnailH} from "../t/ThumbnailH.js";
import {ThumbnailOverlay} from "../t/ThumbnailOverlay.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {RichThumbnail} from "../../_rich/RichThumbnail.js";

export interface CompactVideoRenderer extends TrackingParams {
	accessibility: Accessibility;
	badges?: MetadataBadgeRenderers[];
	channelThumbnail: ThumbnailH;
	lengthText: SimpleTextFixmeValueNeeded;
	longBylineText: TextRuns;
	menu: MenuRendererH;
	navigationEndpoint: NavigationEndpoint;
	publishedTimeText: SimpleTextFixmeValueNeeded;
	richThumbnail?: RichThumbnail;
	shortBylineText: TextRuns;
	shortViewCountText: SimpleTextFixmeValueNeeded;
	thumbnail: ThumbnailsList;
	thumbnailOverlays: ThumbnailOverlay[];
	title: SimpleTextFixmeValueNeeded;
	ownerBadges?: MetadataBadgeRenderers[];
	videoId: string;
	viewCountText: SimpleTextFixmeValueNeeded;
};
