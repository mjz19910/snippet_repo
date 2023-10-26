import {E_VE37414_ReelWatch} from "../../../e/GR_E_VE.ts";
import {G_RS_ShortsPage} from "../../../ghi/group_G.ts";

export type NavFinishDetail_Shorts={
	pageType: "shorts";
	endpoint: E_VE37414_ReelWatch;
	response: G_RS_ShortsPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
