import {Accessibility} from "../a/Accessibility.js";
import {Icon} from "../i/Icon.js";
import {YtTextType} from "../s/YtTextType.js";
import {Thumbnail} from "../t/Thumbnail.js";
import {ButtonRenderer} from "./ButtonRenderer.js";
import {CountryCode} from "./CountryCode";

export type DesktopTopbarRendererData={
	logo: {
		topbarLogoRenderer: {
			iconImage: Icon<"YOUTUBE_LOGO">;
		};
	};
	searchbox: {
		fusionSearchboxRenderer: {
			icon: Icon<"SEARCH">;
		};
	};
	trackingParams: string;
	countryCode: CountryCode;
	topbarButtons: ({
		topbarMenuButtonRenderer: {
			icon: Icon<"VIDEO_CALL">;
		};
	}|{
		notificationTopbarButtonRenderer: {
			icon: Icon<"NOTIFICATIONS">;
		};
	}|{
		topbarMenuButtonRenderer: {
			avatar: {
				accessibility: Accessibility;
				thumbnails: Thumbnail[];
			};
		};
	})[];
	hotkeyDialog: {
		hotkeyDialogRenderer: {
			title: YtTextType;
		};
	};
	backButton: ButtonRenderer;
	forwardButton: ButtonRenderer;
	a11ySkipNavigationButton: ButtonRenderer;
	voiceSearchButton: ButtonRenderer;
};
