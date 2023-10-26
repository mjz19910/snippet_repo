import {TR_SectionListItem_3_Empty,T_DC_Content_2} from "../stu/group_T.ts";

export type G_DC_SectionList_BrowseFeed_ChannelFeatured=
	|T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3_Empty>
	|T_DC_Content_2<`browse-feedUC${string}search`,TR_SectionListItem_3_Empty>;
