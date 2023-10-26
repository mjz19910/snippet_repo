import {R_CompactPlaylist,R_CompactRadio,R_CompactVideo,R_ContinuationItem} from "../r/group_R.ts";

export type G_RelatedItem=
	|R_CompactPlaylist
	|R_CompactRadio
	|R_CompactVideo
	|R_ContinuationItem;
