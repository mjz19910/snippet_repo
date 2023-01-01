import {Accessibility} from "./Accessibility.js";
import {YtEndpoint} from "./YtEndpoint.js";
import {YtTextType} from "./YtTextType.js";
import {ThumbnailsList} from "../support/yt_api/_/t/ThumbnailsList.js";

export type ChannelOptionsRendererData={
	avatar: ThumbnailsList;
	avatarEndpoint: YtEndpoint;
	name: string;
	links: YtTextType[];
	avatarAccessibility: Accessibility;
};
