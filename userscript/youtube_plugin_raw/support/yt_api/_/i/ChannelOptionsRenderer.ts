import {Accessibility} from "../a/Accessibility.js";
import {YtTextType} from "../s/YtTextType.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {UrlEndpoint} from "../u/UrlEndpoint.js";

export type ChannelOptionsRenderer={
	channelOptionsRenderer: {
		avatar: ThumbnailsList;
		avatarEndpoint: UrlEndpoint;
		name: string;
		links: YtTextType[];
		avatarAccessibility: Accessibility;
	};
};
