import {ActionSetPlaylistVideoOrder} from "./ActionSetPlaylistVideoOrder";

export type SortFilterSubMenuRenderer={
	accessibility: {
		accessibilityData: {
			label: "Ordering";
		};
	};
	icon: {
		iconType: "SORT";
	};
	subMenuItems: ActionSetPlaylistVideoOrder<1|2|3|4|5>[];
	title: "Sort";
	trackingParams: string;
};
