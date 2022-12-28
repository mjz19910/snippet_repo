import {MetadataBadgeRenderer} from "../m/MetadataBadgeRenderer.js";
import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {key_simpleText, SimpleText} from "../s/SimpleText.js";
import {ThumbnailH} from "../t/ThumbnailH.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {IconExternalLink} from "../i/IconExternalLink";
import {DisplayAdRenderer} from "./DisplayAdRenderer";

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

export interface TN extends TrackingParams {
	thumbnail: ThumbnailH;
};

export type BG={
	"metadataBadgeRenderer": MetadataBadgeRenderer;
};

export interface MR extends TrackingParams {
	"menuRenderer": AM;
};

export type AdTitle_0={
	"simpleText": "Create Lasting Wealth";
};

interface ButtonRenderer extends TrackingParams {
	"style": "STYLE_LIGHT_TEXT";
	"text": SimpleText<key_simpleText,"Visit site">;
	"icon": IconExternalLink;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};

export type MHO={
	"buttonRenderer": ButtonRenderer;
};

interface metadataBadgeRendererData extends TrackingParams {
	"icon": IconExternalLink;
	"style": "BADGE_STYLE_TYPE_BLACK";
};

export type metadataBadgeRenderer={
	"metadataBadgeRenderer": metadataBadgeRendererData;
};

export type RenderingContent={
	"displayAdRenderer": DisplayAdRenderer;
};
