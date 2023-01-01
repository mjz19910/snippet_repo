import {Icon} from "./Icon.js";
import {Accessibility} from "./Accessibility.js";
import {ActionSetPlaylistVideoOrder} from "./ActionSetPlaylistVideoOrder";

export type SortFilterSubMenuRenderer={
	accessibility: Accessibility;
	icon: Icon<"SORT">;
	subMenuItems: ActionSetPlaylistVideoOrder[];
	title: string;
	trackingParams: string;
};
