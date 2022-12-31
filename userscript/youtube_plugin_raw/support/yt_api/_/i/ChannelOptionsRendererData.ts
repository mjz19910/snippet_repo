import {Accessibility} from "../a/Accessibility.js";
import {YtTextType} from "../s/YtTextType.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";
import {UrlEndpointData} from "../u/UrlEndpoint.js";

export type ChannelOptionsRendererData={
	avatar: ThumbnailsList;
	avatarEndpoint: UrlEndpointData;
	name: string;
	links: YtTextType[];
	avatarAccessibility: Accessibility;
};
