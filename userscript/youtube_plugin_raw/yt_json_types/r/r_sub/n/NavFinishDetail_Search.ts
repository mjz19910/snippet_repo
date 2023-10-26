import {E_Search} from "../../../e/GR_E_VE.ts";
import {RS_SearchPage} from "../../group_R.ts";

export type NavFinishDetail_Search={
	pageType: "search";
	endpoint: E_Search;
	response: RS_SearchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
