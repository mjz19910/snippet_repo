import {SimpleText} from "./SimpleText";
import {ImpressionEndpoint} from "./ImpressionEndpoint";
import {ThumbnailH} from "./ThumbnailH.js";
import {MetadataBadgeRenderer} from "./MetadataBadgeRenderer";
import {NavigationEndpoint} from "./NavigationEndpoint";
import {Icon} from "./Icon";
import {ClickCommand} from "./ClickCommand";
import {TrackingParams} from "./TrackingParams.js";

type MAC={
	"text": "My Ad Centre";
};

type MNR_T={
	"runs": [MAC];
};
type InfoIcon={
	"iconType": "INFO";
}
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
}

type AM={
	"items": I1[];
	"accessibility": accessibilityEx<{label: "Action menu"}>;
};

type TN={
	thumbnail: ThumbnailH;
};

type BG={
	"metadataBadgeRenderer": MetadataBadgeRenderer;
};

type MR={
	"menuRenderer": AM&TrackingParams;
};

type BTNR={
	"style": "STYLE_PRIMARY";
	"text": SimpleText;
	"icon": Icon;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};

type BTN={
	"buttonRenderer": BTNR&TrackingParams;
};

type AdTitle_0={
	"simpleText": "Create Lasting Wealth";
};

type ST_VS={
	"simpleText": "Visit site";
};

type IconExternalLink={
	"iconType": "EXTERNAL_LINK";
};

type MHO_BTN={
	"style": "STYLE_LIGHT_TEXT";
	"text": ST_VS;
	"icon": IconExternalLink;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};

type MHO={
	"buttonRenderer": MHO_BTN&TrackingParams;
};

type MBR={
	"icon": IconExternalLink;
	"style": "BADGE_STYLE_TYPE_BLACK";
};

type MB={
	"metadataBadgeRenderer": MBR&TrackingParams;
};

interface DAL_TLI extends TrackingParams {
	"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	"titleText": AdTitle_0;
	"image": TrackingParams&TN;
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
