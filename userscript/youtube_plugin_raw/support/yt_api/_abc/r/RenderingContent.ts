import {ClickCommand} from "../c/ClickCommand.js";
import {ImpressionEndpoint} from "../i/ImpressionEndpoint.js";
import {Icon} from "../i/Icon.js";
import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {SimpleText} from "../s/SimpleText.js";
import {ThumbnailH} from "../t/ThumbnailH.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {IconExternalLink} from "../i/IconExternalLink";

type MAC={
	"text": "My Ad Centre";
};

type MNR_T={
	"runs": [MAC];
};
type InfoIcon={
	"iconType": "INFO";
};
interface MNR extends TrackingParams {
	"text": MNR_T;
	"icon": InfoIcon;
	navigationEndpoint: NavigationEndpoint;
};

type I1={
	"menuNavigationItemRenderer": MNR;
};

export type accessibilityEx<T>={
	accessibilityData: T;
};

type AM={
	items: I1[];
	accessibility: {
		accessibilityData: {
			label: "Action menu";
		};
	};
};

interface TN extends TrackingParams {
	thumbnail: ThumbnailH;
};

type BG={
	"metadataBadgeRenderer": MetadataBadgeRenderer;
};

interface MR extends TrackingParams {
	"menuRenderer": AM;
};

interface BTN_Ren extends TrackingParams {
	"style": "STYLE_PRIMARY";
	"text": SimpleText;
	"icon": Icon<never>;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};

type BTN={
	"buttonRenderer": BTN_Ren;
};

type AdTitle_0={
	"simpleText": "Create Lasting Wealth";
};

type ST_VS={
	"simpleText": "Visit site";
};

interface MHO_BTN extends TrackingParams {
	"style": "STYLE_LIGHT_TEXT";
	"text": ST_VS;
	"icon": IconExternalLink;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};

type MHO={
	"buttonRenderer": MHO_BTN;
};

interface MBR extends TrackingParams {
	"icon": IconExternalLink;
	"style": "BADGE_STYLE_TYPE_BLACK";
};

type MB={
	"metadataBadgeRenderer": MBR;
};

interface DAL_TLI extends TrackingParams {
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
	"clickCommand": ClickCommand;
	"mediaHoverOverlay": MHO;
	"mediaBadge": MB;
};

export type RenderingContent={
	"displayAdRenderer": DAL_TLI;
};
