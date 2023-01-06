import {Accessibility} from "./Accessibility.js";
import {TextT} from "./TextT.js";

export type ChannelOptionsData={
	avatar: Thumbnail;
	avatarEndpoint: YtEndpoint;
	name: string;
	links: TextT[];
	avatarAccessibility: Accessibility;
};
