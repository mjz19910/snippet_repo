import {E_VE6827,E_VE96368,E_VE3854} from "../../../e/GR_E_VE.js";
import {RS_VE6827_BrowsePage,RS_VE96368_BrowsePage,RS_VE3854_BrowsePage} from "../../group_R.js";

export type NavFinishDetail_Browse={
	endpoint: E_VE6827;
	pageType: "browse";
	fromHistory: boolean;
	response: RS_VE6827_BrowsePage;
	navigationDoneMs: number;
}|{
	endpoint: E_VE96368;
	pageType: "browse";
	fromHistory: false;
	response: RS_VE96368_BrowsePage;
	navigationDoneMs: number;
}|{
	pageType: "browse";
	endpoint: E_VE3854;
	response: RS_VE3854_BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
