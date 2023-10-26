import {E_VE5754} from "../../../e/GR_E_VE.ts";
import {RS_PlaylistPage} from "../../group_R.ts";

export type NavFinishDetail_Playlist={
	endpoint: E_VE5754;
	pageType: "playlist";
	fromHistory: false;
	response: RS_PlaylistPage;
	navigationDoneMs: number;
};
