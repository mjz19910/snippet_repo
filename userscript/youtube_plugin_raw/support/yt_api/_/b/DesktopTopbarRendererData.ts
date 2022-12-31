import {ButtonRenderer} from "./ButtonRenderer.js";
import {CountryCode} from "./CountryCode";
import {FusionSearchboxRenderer} from "./FusionSearchboxRenderer";
import {hotkeyDialogRenderer} from "./hotkeyDialogRenderer";
import {TopbarButtonItem} from "./TopbarButtonItem";
import {TopbarLogoRenderer} from "./TopbarLogoRenderer";

export type DesktopTopbarRendererData={
	logo: TopbarLogoRenderer;
	searchbox: FusionSearchboxRenderer;
	trackingParams: string;
	countryCode: CountryCode;
	topbarButtons: TopbarButtonItem[];
	hotkeyDialog: hotkeyDialogRenderer;
	backButton: ButtonRenderer;
	forwardButton: ButtonRenderer;
	a11ySkipNavigationButton: ButtonRenderer;
	voiceSearchButton: ButtonRenderer;
};
