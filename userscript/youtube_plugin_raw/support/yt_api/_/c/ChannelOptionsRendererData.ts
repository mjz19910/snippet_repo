import {Accessibility} from "../../../../yt_json_types/Accessibility.js";
import {YtEndpoint} from "../../json/YtEndpoint.js";
import {YtTextType} from "../../json/YtTextType.js";
import {ThumbnailsList} from "../t/ThumbnailsList.js";

export type ChannelOptionsRendererData={
	avatar: ThumbnailsList;
	avatarEndpoint: YtEndpoint;
	name: string;
	links: YtTextType[];
	avatarAccessibility: Accessibility;
};
