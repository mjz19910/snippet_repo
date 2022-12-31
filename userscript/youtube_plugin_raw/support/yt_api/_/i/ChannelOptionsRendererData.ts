import {Accessibility} from "../a/Accessibility.js";
import {YtEndpoint} from "../b/YtEndpoint.js";
import {YtTextType} from "../../yt/YtTextType.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";

export type ChannelOptionsRendererData={
	avatar: ThumbnailsList;
	avatarEndpoint: YtEndpoint;
	name: string;
	links: YtTextType[];
	avatarAccessibility: Accessibility;
};
